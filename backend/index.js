const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require("./data");
const exceljs = require("exceljs");
const fs = require("fs");
const { randomizer } = require("./services");
const app = express();
const port = 3001;

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", () => {
    socket.emit("message", data?.[data?.length - 1]);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // Handle custom events from the client
  socket.on("message", (data) => {
    console.log("Received message from client:", data);
    // Broadcast the received message to all clients except the sender
    socket.broadcast.emit("message", data);
  });
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a route for the API endpoint
app.get("/motions-detected", (req, res) => {
  // Send the response
  res.json(data);
});

app.get("/export-to-excel", async (req, res) => {
  try {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Motion Data");

    // Add headers
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Add data
    data.forEach((item) => {
      const row = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });

    // Save the workbook to a file
    const filePath = "./motion_data.xlsx";
    await workbook.xlsx.writeFile(filePath);

    // Send the file as response
    res.download(filePath, "motion_data.xlsx", () => {
      // Delete the file after download completes
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    res.status(500).send("Error exporting to Excel");
  }
});

app.get("/latest-motion-detected", (req, res) => {
  res.json(data?.[data?.length - 1]);
});
// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  randomizer(io);
});
