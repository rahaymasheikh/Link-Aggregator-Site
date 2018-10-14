const express = require('express');
const app = express();

const path = require('path');

const parser = require('body-parser');

app.set('view engine', 'hbs');
const staticPath = path.resolve(__dirname, 'public');


// express.static returns middleware function
app.use(express.static(staticPath));

app.use(parser.urlencoded({"extended":false}));


// app.use(parser.json());
app.use((req, res, next) => {
    console.log(req.method, req.path, '\n=======\n', 'req.query:', req.query, '\n', 'req.body:', req.body);
    next();});



const wasquapaArch = { title: 'washington sq arch',
                    date: '2018-09-29',
                    artwork:' _______________\n' +
                            ' |~|_________|~|\n' +
                            ' |::::\\^o^/::::|\n' +
                            ' ---------------\n' +
                            ' |..|/     \\|..|\n' +
                            ' ---        ----\n' +
                            ' |  |       |  |\n' +
                            ' |  |       |  |\n' +
                            ' |  |       |  |\n' +
                            '.|__|.     .|__|.',
                    tags: ['architecture', 'public']};




const boba = {title: 'boba',
            date: '2018-09-30',
            artwork:'  ______\n' +
                    '  ======\n' +
                    ' /      \\\n' +
                    '|        |-.\n' +
                    '|        |  \\\n' +
                    '|O.o:.o8o|_ /\n' +
                    '|.o.8o.O.|\n' +
                    ' \\.o:o.o/',
            tags: ['snack', 'notmybestwork']};


const buddy = {title: 'buddy',
            date: '2018-10-31',
            artwork:'       ___\n' +
                    '      /  /\\   |---.\n' +
                    '      |__|/__ |---,\\\n' +
                    '      |  `   |=    `\n' +
                    '      |      /|\n' +
                    '      |  .--\' |\n' +
                    '      |   |\\  |\n' +
                    '      |   | \\ |\n' +
                    '     /|   | | |\n' +
                    '    \\/    |  \\|\n' +
                    '___ /_____\\___|\\____',
            tags: ['halloween', 'squad', 'fashion']};



const artwork = [buddy, boba, wasquapaArch];
const artworkTags = [buddy['tags'], boba['tags'], wasquapaArch['tags']];

let filteredArtwork = [];

app.get('/', (req, res) => {

    if (req.query['tag'] !== undefined){
        for (let i = 0; i < artworkTags.length; i++){
            if( artworkTags[i].includes(req.query['tag'])){
                filteredArtwork.push(artwork[i]);
            }
        }

        res.render('index', {'artwork': filteredArtwork});
        filteredArtwork = [];
    }

    else{
        res.render('index', {'artwork': artwork});
    }
});

app.get('/add', (req, res) => {

    res.render('add');
});

app.post('/add', (req, res) => {

    if (req.body !== null){
        const newArtwork = { title: req.body['title'],
            date: req.body['date'],
            artwork: req.body['artwork'],
            tags: (req.body['tags']).split(' ')
        };

        artwork.unshift(newArtwork);
        artworkTags.unshift(newArtwork['tags']);


    }
    res.redirect('/');
});



app.listen(3000);
