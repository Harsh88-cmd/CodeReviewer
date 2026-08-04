const { Queue } = require("bullmq");
const connection = require("../config/redis");

const reviewQueue = new Queue("review-queue", {
  connection: connection,
});

module.exports = reviewQueue;