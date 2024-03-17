const express = require("express");
const app = express();

const cors = require("cors");

app.get("/",(req,res)=>{
    return res.json("Yes from Music server")
})

app.listen(5000, () => console.log("Music server is running"));
