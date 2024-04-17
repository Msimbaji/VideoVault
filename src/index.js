import connectDB from "./db/index.js"
import dotenv from "dotenv"
import {app} from "./app.js"
dotenv.config({
    path: './env'
})



connectDB()
.then(()=>
{
  app.on("error",(error)=>
{
  console.log("Error is: ",error)
})
  app.listen(process.env.PORT||8000,()=>
{
  console.log(`Server running at port: ${process.env.PORT}`)
})
})
.catch((err)=>{
   console.log("MONGO db Connection failed !!!",err)
})






















/*
(async ()=>{
  try {

    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",()=>{
        console.log("Error:",error)
        throw error
    })
    app.listen(process.env.PORT,()=>
{
    console.log(`App is listening at ${process.env.PORT}`)
})
  } catch (error) {
    console.error("ERROR:",error)
    throw error
    
  }

})()
*/