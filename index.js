const port = process.env.PORT || 3000;
const app =  require('./app');
const db = require('./database/db');


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/about', (req, res) => {
    res.send('About Page');
})

app.listen(port, ()=> {
    console.log(`Server is running on port http://localhost:${port}`);
})