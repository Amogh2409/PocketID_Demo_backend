const port = process.env.PORT || 3000;
const app = require('express')();


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, ()=> {
    console.log(`Server is running on port http://localhost:${port}`);
})