import dns from "dns";
import mongoose from "mongoose";
 
// Force Node to use public DNS servers to avoid local DNS issues (ECONNREFUSED on SRV lookups).
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI;
    if (!url) {
      throw new Error('MONGODB_URI no está configurada en .env');
    }
    const { connection } = await mongoose.connect(url);
    const urlTwo = `${connection.host}:${connection.port}`;
    console.log(`✅ MongoDB Conectado en: ${urlTwo}`);
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};