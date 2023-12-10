const express = require("express");

const router = express.Router();

const PostController = require("../Controllers/PostController");

router.post('/UploadPost',PostController.UploadPost);
router.get('/ListPosts',PostController.ListPosts);
router.post('/PostInteraction',PostController.PostInteraction);
router.get('/List_PostInteraction',PostController.List_PostInteraction);
router.patch('/ExpirePost',PostController.ExpirePost);
router.get('/List_ExpirePosts',PostController.List_ExpirePosts);

module.exports = router;