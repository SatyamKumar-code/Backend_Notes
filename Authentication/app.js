const cookieParser = require('cookie-parser');
const express = require('express');
app = express();


app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('name', 'satyam');
    res.send('Hello World!');
});

app.get("/read", (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});