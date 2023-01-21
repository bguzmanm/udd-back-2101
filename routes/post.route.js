const express = require("express");
const router = express.Router();

const auth = require("../auth/auth");
const { create, findAll, findByUser, findOne, remove, update } = require("../controllers/post.controller");

router.get("/", findAll);
router.get("/user", auth, findByUser);
router.get("/one", findOne);

router.post("/", auth, create);
router.delete("/", auth, remove);
router.patch("/", auth, update);

module.exports = router;
