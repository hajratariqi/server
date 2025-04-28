const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://hajra-admin:admin123@cluster0.z1vt9id.mongodb.net/smit-hackathon?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

module.exports = connectDB;
