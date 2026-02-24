const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;


function getShared() {

    const navbar = fs.readFileSync(path.join(__dirname, 'shared', 'navbar.html'), 'utf8');
    const footer = fs.readFileSync(path.join(__dirname, 'shared', 'footer.html'), 'utf8');
    return { navbar, footer };
}


function injectSharedComponents(html) {
    const { navbar, footer } = getShared();
    return html
        .replace(/<!--\s*NAVBAR\s*-->/g, navbar)
        .replace(/<!--\s*FOOTER\s*-->/g, footer);
}



app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/style.css', express.static(path.join(__dirname, 'style.css')));
app.use('/app.js', express.static(path.join(__dirname, 'app.js')));
app.use('/hero.png', express.static(path.join(__dirname, 'hero.png')));


app.get('/', (req, res) => {
    const content = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    res.send(injectSharedComponents(content));
});



app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    if (page.endsWith('.html')) return res.redirect('/' + page.replace('.html', ''));


    if (page.includes('.') || page.includes('/') || page.includes('\\')) return next();

    const filePath = path.join(__dirname, `${page}.html`);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        res.send(injectSharedComponents(content));
    } else {
        next();
    }
});

// Fallback
app.get('*', (req, res) => {
    const content = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    res.send(injectSharedComponents(content));
});

// Export the app for Vercel
module.exports = app;



if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n  🌿 VNBD Website running at http://localhost:${PORT}\n`);
    });
}
