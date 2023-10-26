const express = require('express')
const mongoose = require('mongoose').default
const Url = require('./models/url')
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json());
app.listen(5000);

function generateShortLink() {
    const shortLink = `http://localhost:5000/${Math.random().toString(36).substring(2, 8)}`;
    return shortLink;
}

app.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        res.json({urls})
    } catch (error) {
        console.error(error);
    }
})

app.post('/shortenUrl', async (req, res) => {
    console.log('req', req.body)
    const originalUrl = req.body.originalUrl;
    if(originalUrl) {
        const shortLink = generateShortLink(originalUrl);
        await Url.create({ original: originalUrl, short: shortLink})
        res.json({ shortLink });
    } else {
        res.status(400).json({error: 'No url found!'})
    }
})

app.get('/:shortLink', async (req, res) => {
    console.log('param', req.params.shortLink)
    const link = await Url.findOne({ short: `http://localhost:5000/${req.params.shortLink}`});
    console.log('linkkk', link)
    if(link == null) return res.sendStatus(404)
    res.redirect(link.original)
})

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

