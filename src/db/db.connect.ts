import mongoose from "mongoose"


 export const dbConnect = () => {

    const user = process.env.DB_USER
    const password = process.env.DB_PASSWD
    const uri =`mongodb+srv://${user}:${password}@cluster0.eiz8wjd.mongodb.net/?retryWrites=true&w=majority` 
    console.log(uri)
    return mongoose.connect(uri)
 }



