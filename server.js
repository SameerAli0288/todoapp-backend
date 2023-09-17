const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const cronJob = require("./cron/cronJob");

// const cors = require("cors");

// app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start the cron job to delete completed todos daily at a specific time
cronJob.startCronJob();
