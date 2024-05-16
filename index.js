const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./router/userRoute')
const app = express();
const cors = require('cors')
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/Sci_proj');

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.get('/', (req, res) => {
        res.json({ message: 'Hello, World!' });
    });

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
});
app.use(cors({
    origin: 'http://localhost:4200'
  }));
app.use('/user',userRoute)