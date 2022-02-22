// Importing or requiring module files: express, bodyparser, lodash, mongoose.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const _ = require("lodash");
const mongoose = require("mongoose");
const { type } = require("express/lib/response");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


// Eastablishing connection with mongodb localhost
mongoose.connect("mongodb+srv://PankajSingh:Pankaj%401003@cluster0.8o0wu.mongodb.net/Personal-Blog-Database?retryWrites=true&w=majority", {useNewUrlParser: true}).then(() => {
  console.log("connection successfull");
}).catch((err) => {
  console.log(err);
});
// Creating the schema for blogs
const blogSchema = new mongoose.Schema({ title: String, description: String });
const homeSchema = new mongoose.Schema({ description: String })
// Creating the collection or model required
const blogModel = new mongoose.model("blog", blogSchema);
const homeModel = new mongoose.model("home", homeSchema);


// Home routings or root routings
app.get("/", (req, res) => {  
  
  blogModel.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {startingContent: homeStartingContent, content: docs});
    }
  });
  
  // console.log(blogItems);
})

// About page routings
app.get("/about", (req, res) => {
  res.render("about", {content: aboutContent});
})

// Contact page routings
app.get("/contact", (req, res) => {
  res.render("contact", {content: contactContent});
})

// Compose page routings
app.get("/compose", (req, res) => {
  res.render("compose");  
})

app.post("/compose", (req,res) => {
  const blog = new blogModel({
    title: req.body.postTitle,
    description: req.body.postContent 
  })
  blog.save(err => {
    if (!err)
      res.redirect("/");
  });
})

// Posts routing
app.get("/posts/:parameters", (req, res) => {
  const parameters = req.params.parameters;
  // blogItems.forEach(element => { 
  //   const titleLower = _.lowerCase(element.postTitle)
  //   if (titleLower === parameters){
      // res.render("post", {postHeading: element.postTitle, postContent: element.postContent});
  //   }
  // });

  blogModel.findOne({title: parameters}, (err, docs) => {
      if (!err) 
        res.render("post", {postHeading: docs.title, postContent: docs.description});
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
