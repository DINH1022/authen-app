const mongoose = require('mongoose');

// Test MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vinh:abcdef05@cluster0.v00nt.mongodb.net/test?retryWrites=true&w=majority';

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    console.log('URI:', MONGODB_URI.replace(/:[^:]*@/, ':***@')); // Hide password
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test a simple operation
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log('✅ Test operation successful!');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n🔧 Troubleshooting ENOTFOUND:');
      console.log('1. Check if cluster URL is correct');
      console.log('2. Verify MongoDB Atlas cluster is running');
      console.log('3. Check network connectivity');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\n🔧 Troubleshooting Authentication:');
      console.log('1. Verify username/password');
      console.log('2. Check database user permissions');
      console.log('3. Ensure special characters in password are URL encoded');
    }
    
    process.exit(1);
  }
}

testConnection();