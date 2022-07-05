const express = require('express');
const app = express();

const usersRouter = require('./Routers/usersRouter');
const uploadRouter = require('./Routers/uploadRouter');
const filesRouter = require('./Routers/filesRouter');
const pagesRouter = require('./Routers/pagesRouter');

app.listen(40000, () => {
    console.log("Server running on port " + 40000);
})

const database = require('./Persistance/Database/db');

app.use('/api/', usersRouter);
app.use('/api/', uploadRouter);
app.use('/api/', filesRouter);
app.use(pagesRouter);

app.use(express.static(path.join(__dirname, '../WEB-PAGE')));

app.get('/reset', async (req, res) => {
    await database.sync({ force: true });
    res.send({message: 'Reset'});
})