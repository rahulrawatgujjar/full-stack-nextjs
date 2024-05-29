import mongoose from "mongoose";


const connection = {
  isConnected: 0
}

mongoose.connection.on("connected", () => {
  console.log("Database connected successfully")
})

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error, please make sure db is up and running:", err);
  connection.isConnected = 0;
  process.exit(1)
})

async function connect() {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI)

    // learning more about connection
    console.log(db.connections)

    connection.isConnected = db.connections[0].readyState

  } catch (error) {
    console.log("Failed to connect to database", error)
    process.exit(1)
  }
}

export default connect;