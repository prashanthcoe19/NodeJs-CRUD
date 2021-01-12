const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.json({ msg: 'welcome to the app' }));

app.use(express.json({ extended: false }));

app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
