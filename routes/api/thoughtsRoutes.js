const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:userId
router.route("/:userId").post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route("/:thoughtId/reactions/:reactionId")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
