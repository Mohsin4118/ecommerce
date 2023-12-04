import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async ()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          
          console.log('Connected to MongoDB'.bgGreen.black);
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error}`.bgRed.white)
    }
}

export default connectDB
