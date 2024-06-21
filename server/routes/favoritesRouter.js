const Router = require("express");
const router = new Router();
const favoritesController = require("../controllers/favoritesController");
const checkRole = require("../middleware/checkRoleMiddleware");
const authMiddleware = require('../middleware/authMiddleware')

router.post("/", authMiddleware, favoritesController.create);
router.post("/destroy", authMiddleware, favoritesController.destroy);
router.get("/", authMiddleware, favoritesController.getAll);

module.exports = router;
