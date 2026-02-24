const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/public', express.static(path.join(__dirname, 'public')));




app.get('/', (req, res) => {
    res.render('index');
});


app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    if (page.endsWith('.html')) {
        return res.redirect('/' + page.replace('.html', ''));
    }

    if (page.includes('.')) return next();


    const templatePath = path.join(__dirname, 'views', `${page}.ejs`);
    if (fs.existsSync(templatePath)) {
        res.render(page);
    } else {
        next();
    }
});

// Fallback to home
app.get('*', (req, res) => {
    res.render('index');
});

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n  🌿 VNBD Website running at http://localhost:${PORT}\n`);
    });
}
