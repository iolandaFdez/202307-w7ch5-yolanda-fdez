import mongoose from "mongoose"

 export const dbConnect = () => {

    const user = process.env.DB_userName
    const password = process.env.DB_password
    const uri =`mongodb+srv://${user}:${password}@cluster0.eiz8wjd.mongodb.net/?retryWrites=true&w=majority` 
    
    return mongoose.connect(uri)
 }



