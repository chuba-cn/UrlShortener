if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
};
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const path = require('path');
const Url = require('./model/url');
const { nanoid } = require('nanoid');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/URL-LESS';

mongoose.connect(dbUrl);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('Database connection established');
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/api/shorturl', async (req, res) => {
    function isValidUrl(url) {
        const urlRegex = /^(https?:\/\/)/i; // Match "https://" or "http://"
        return urlRegex.test(url);
    }

    try{
        const {url} = req.body;
        if(!isValidUrl(url)){
            // return res.status(400).json({error: 'invalid url'});
            return res.json({error: 'invalid url'});
        }

        const existingUrl = await Url.findOne({original_url: url});
        
        if(existingUrl){
            // return res.status(200).json(existingUrl);
            return res.json({existingUrl});
        } else{
            const newUrl = new Url({original_url: url});
            newUrl.short_url = nanoid(5);
            await newUrl.save();
            // res.status(200).json(newUrl);
            res.json(newUrl);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error!!'});
    }
});

app.get('/api/shorturl/:short_url', async (req, res) => {
    try{
        const {short_url} = req.params;
        const foundUrl = await Url.findOne({short_url: short_url});

        if(foundUrl){
            res.redirect(foundUrl.original_url);
        }else{
            // res.status(404).json({error: 'URL not found!'});
            res.json({error: 'URL not found!'})
        }
    }
    catch(e){
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});