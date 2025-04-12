const express = require('express');
const app = express();
const d = require('./config/mongoose-connection')

const cookieParser = require('cookie-parser');
const path = require('path');
const ownersRouter = require('./routes/ownersRouter');
const userRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");



app.use("/owner", ownersRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(3000);