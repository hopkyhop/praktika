const Router = require("express");
const router = new Router();
const townController = require("../controllers/townController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), townController.create);
router.get("/", townController.getAll);

module.exports = router;
