import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json('Well done!').status(200);
})


app.listen(3000, () => {
    return console.log(`Server running on 3000`);
});