import 'dotenv/config';

import app from './server.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║ 🚀 Servidor iniciado correctamente    ║
║ 🔗 http://localhost:${PORT}           ║
╚═══════════════════════════════════════╝
  `);
});


