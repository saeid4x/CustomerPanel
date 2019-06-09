  var express = require("express"),
    multer = require("multer"),
    bodyParser = require("body-parser"),
    path = require("path");
  // var cors=require('cors');
  var Keys=require('./config/keys');

  // Routes
  var routes = require("./Routes/api/routes");
  var adminRoutes = require("./Routes/api/admin");
  var adminBranchRoutes = require("./Routes/api/adminBranch");
  var customerRoutes = require("./Routes/api/customer");
  var cors=require('cors');
  var multer=require('multer')

  

  var app = express();
app.set("views", path.join(__dirname, "views"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var storage=multer.diskStorage({
  destination:'public/uploads/images',
 filename:(req,file,cb)=>{
   cb(null,'avatar-'+ Date.now()+path.extname(file.originalname));    
 }
})
var upload=multer({
   // dest:'../public/uploads/images/',
   storage:storage,
   limits:{fileSize:2 *1024 * 1024} , // 2MB,  
 
})

// <upload-multer />


// app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./public"));
 

//@@
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors());
 
app.use("/api", routes);
app.use("/api/admin", adminRoutes);
app.use("/api/adminBranch", adminBranchRoutes);
app.use("/api/customer", customerRoutes);

//  app.use(routes);
const port = process.env.PORT || 8000;
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client","build","index.html"))
});

app.listen(port, err => {
  console.log("connected to port =\t", port);
});
