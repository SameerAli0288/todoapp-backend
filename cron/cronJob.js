const CronJob = require("cron").CronJob;
const fs = require("fs");

const TODOS_FILE_PATH = "./data/todos.json";

const deleteCompletedTodos = () => {
  try {
    // Read existing todos from the JSON file
    let todosData = fs.readFileSync(TODOS_FILE_PATH, "utf-8");
    let todos = JSON.parse(todosData);

    // Filter out completed todos
    const filteredTodos = todos.filter((todo) => !todo.completed);

    // Write the updated list back to the JSON file
    fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(filteredTodos, null, 2));

    console.log("Cron Job: Deleted completed todos.");
  } catch (error) {
    console.error("Cron Job Error:", error);
  }
};

const startCronJob = () => {
  // Define the cron schedule (e.g., daily at 2:00 AM)
  const cronSchedule = "27 16 * * *";

  // Create a new cron job
  const job = new CronJob(cronSchedule, deleteCompletedTodos);

  // Start the cron job
  job.start();
};

module.exports = { startCronJob };
