var express =   require("express");
var multer  =   require('multer');
var fs      =   require("fs");
var app     =   express();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    //callback(null, file.fieldname + '-' + Date.now());
	callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.get('/list/:id', function (req, res) {   
   var data = [];
   var path = './uploads'; 
   console.log('id: ' +req.params.id);
   var items = fs.readdirSync(path);
   for(var i in items){
		var id = items[i].split('_');
		if(id[0] == req.params.id){ 
			var vt = id[1].split('.')[0];
			data.push(vt);
			console.log(vt);	
		}
   }
   res.end(data.toString());   
})

app.get('/:id', function (req, res) {   ;
   var file_path = __dirname + "/" + "uploads/"+req.params.id+".jpg";
   res.sendFile(file_path);   
})

app.post('/imgupload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
			console.log(error.stack);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(9000,function(){
    console.log("Working on port 9000");
});