const Router = require("express");
const router = new Router();
const formController = require("../controllers/formController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), formController.create);
router.get("/", formController.getAll);

module.exports = router;
