const express = require('express');
const cors = require('cors');
const connectDB = require('./connectDB');
const { sign } = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')


const app = express();
app.use(cors());
app.use(express.json()); 

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
