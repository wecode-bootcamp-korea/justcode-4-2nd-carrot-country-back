const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const routes = require("./routes");
// const dotenv = require("dotenv");
const cors = require("cors");
const prisma = new PrismaClient();
const app = express();
const socketIO = require("socket.io");
const PORT = process.env.PORT;

const { handleSocket } = require("./middleware/socket");
// dotenv.config();
app.use(express.static("./database/uploads"));
app.use(cors());
app.use(express.json());
app.use(routes);
app.get("/ping", (req, res) => {
  try {
    res.json({ message: "pong" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_PATH,
    methods: ["GET", "POST"],
  },
});

handleSocket(io);

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

start();
