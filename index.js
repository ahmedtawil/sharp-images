const path = require('path');
require('dotenv').config({ path: './configs/config.env' });
const express = require('express');
const db = require('./db/config');
const app = express();
const Post = require('./db/postSchema');
const uploadFiles = require('./middlewares/uploadFiles');
const { messages , errorMessages} = require('./constants');
const errorsHandler = require('./middlewares/errorsHandler');

app.use(express.static(path.join(__dirname, './', 'client')));
app.use('/uploads', express.static(path.join(__dirname, './', 'uploads')));

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: false , limit:'50mb'}));

app.get('/', async (req, res) => {
    res.sendFile('index.html');
});

app.get('/posts/list/data/get' ,async (req, res , next) => {
    const posts = await Post.findAll();
    res.json({ success: true, posts });
});

app.post('/post/new', uploadFiles , async (req, res , next) => {
    const {title} = req.body
    const img = req.file.originalname
    if(title == undefined || title.trim() == null || req.file == undefined){
        next('fill inputs please!!');
    }
    await Post.create({title , img});
    res.json({ success: true });
})

app.use(errorsHandler);

app.listen(process.env.PORT, async () => {
    console.log(`${messages.SERVER.connection} : ${process.env.PORT}`);
    try {
        await db.authenticate();
        console.log(messages.SERVER.connection);
        //await Post.sync({ force: true });
    } catch (error) {
        console.error(errorMessages.DB.connection, error);
        process.exit(0);
    }
})


