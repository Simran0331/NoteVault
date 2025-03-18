require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

const notesSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    isImportant: Boolean,
    uploadedBy: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;


// const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/noteApp");
// const notesSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   content: String,
//   isImportant: Boolean,
//   uploadedBy: String,
//   date:{
//     type: Date,
//     default: Date.now
//   }
// });
// mongoose.model("Notes", notesSchema);
// module.exports = mongoose.model("Notes")
