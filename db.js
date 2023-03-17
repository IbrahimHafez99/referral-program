import mysql from "mysql2/promise";

export async function connectDB() {
  const dbConnection = await mysql.createConnection({
    host: " ",
    user: "root",
    password: "",
    database: "qrlix",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return dbConnection;
}
