const mongoose = require("mongoose");
//stockportfolio database
mongoose.connect("mongodb+srv://khedekarsohan10:Sohan10@cluster0.4faguxu.mongodb.net/blogpost", {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(() => {
   console.log("Connected to the 'blogpost' database");
})
.catch(error => {
   console.error("Error connecting to the 'blogpost' database:", error);
});


//module.exports = connectDatabase;