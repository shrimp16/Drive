const express = require('express');
const app = express();

const usersRouter = require('./Routers/usersRouter');

app.listen(40000, () => {
    console.log("Server running on port " + 40000);
})

app.use('/api/', usersRouter);