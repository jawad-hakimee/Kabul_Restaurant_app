const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const userRoutes = require('./routes/userRoutes.js');
const foodRoutes = require('./routes/foodRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js');

app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Kabul Restaurant API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
