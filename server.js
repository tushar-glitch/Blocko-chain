require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helloRoute = require('./routes/sample-route');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/hello', helloRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
