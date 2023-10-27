const express = require('express')
const mongoose = require('mongoose').default
const Url = require('./models/url')
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json());
app.listen(5000);

const URL = 'http://localhost:5000'

function generateShortLink() {
    const shortLink = `${URL}/${Math.random().toString(36).substring(2, 8)}`;
    return shortLink;
}

app.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        res.json({ urls })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/shortenUrl', async (req, res) => {
    try {
        const originalUrl = req.body.originalUrl;
        if (originalUrl) {
            const shortLink = generateShortLink(originalUrl);
            await Url.create({ original: originalUrl, short: shortLink });
            res.json({ shortLink });
        } else {
            res.status(400).json({ error: 'No URL found!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/:shortLink', async (req, res) => {
    try {
        const link = await Url.findOne({ short: `${URL}/${req.params.shortLink}` });
        if (link === null) {
            return res.sendStatus(404);
        }
        res.redirect(link.original);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/:shortLink', async (req, res) => {
    try {
        const deletedLink = await Url.deleteOne({ short: `${URL}/${req.params.shortLink}`});
        if (deletedLink.deletedCount === 0) {
            return res.sendStatus(404);
        }

        return res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
})

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

