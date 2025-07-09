import mongoose from "mongoose";

const connectDb = async (uri: string) => {
    await mongoose.connect(uri);
}

export default connectDb;