require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || process.env.LOCAL_MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    profilePic: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;







// const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/noteApp");
// const userSchema = new mongoose.Schema({
//   username: String,
//   name: String,
//   email: String,
//   password: String,
//   profilePic: String,
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });
// mongoose.model('User', userSchema);
// module.exports = mongoose.model('User');
