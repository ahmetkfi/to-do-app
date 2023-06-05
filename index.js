const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const methodOvverride=require('method-override');
const app = express();
const db = require("./db.js");
const Job = require("./models/Job.js");

db.conn();
dotenv.config();
const PORT = process.env.LOCAL_PORT;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(methodOvverride("_method"));

app.get("/", async(req, res) => {
    const search=req.query.search ||"";
    try{
        const job=await Job.find({job_title:{ $regex: search, $options: "i" }});
        res.render('index',{
            job
        });
    }catch(err){
        res.status(500).json({
            err
        })
    }
});
app.post("/", async (req, res) => {
  try {
    const formData=req.body;
    console.log(formData.job_proiritiy);
    const job= await Job.create({
        job_title:formData.job_title,
        job_description:formData.job_description,
        job_priority:parseInt(formData.job_proiritiy),
    });
    res.redirect("/");
  } catch (err) {
    res.status(500).json({
      successed: false,
      err,
    });
    console.log(`create job error : ${err}`);
  }
});
app.delete('/:id',async(req,res)=>{
  await Job.findByIdAndRemove(req.params.id);
  res.redirect('/');
})


app.listen(PORT, () => {
  console.log(`server started on https://localhos:${PORT}`);
});
