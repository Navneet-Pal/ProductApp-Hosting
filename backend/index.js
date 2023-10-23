const express = require("express")
const cors = require("cors");
const app = express();

app.use(express.json());
require("dotenv").config();

const {DBconnect} = require('./Config/database')
DBconnect();

app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

const basicRoute = require("./Routes/route");
app.use("/api" , basicRoute);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "server is up and running ...",
	});
});

app.listen(port , ()=>{
    console.log("server is active now")
})
