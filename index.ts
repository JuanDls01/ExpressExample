import app from './src/app'

app.listen(process.env.PORT || 3001, () => {
    return console.log(`Server running on ${process.env.PORT}`);
});

export default app