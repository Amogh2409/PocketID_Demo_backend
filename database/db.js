const mongoose = require('mongoose');
// mongoose.set('debug', true);

const connection = mongoose.createConnection(`mongodb://127.0.0.1:27017/PocketID`).on('open', () => {
    console.log("MongoDB Connected");
}).on('error', (err) => {
    console.log("MongoDB Connection error", err);
});

module.exports = connection;