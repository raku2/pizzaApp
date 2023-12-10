const express = require("express");

const router = express.Router();

const TopicsController = require("../Controllers/TopicsController");

router.post("/RegisterTopic",TopicsController.RegisterTopic);
router.get("/ListTopics",TopicsController.ListTopics);

module.exports = router;