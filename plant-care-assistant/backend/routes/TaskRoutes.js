const {Router} = require("express");
const multer = require('multer');
const {getTasks, getTaskById, saveTask, updateTask, deleteTask, getTasksByPlantId} = require("../controllers/TaskController");
const {getPlants, savePlant, updatePlant, deletePlant, getPlantsByEmailId } = require("../controllers/UserPlantController");
const {getAll, getById} = require("../controllers/PlantController");
const {registerUser, loginUser, getProfile} = require("../controllers/AuthController");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/task/getAll", getTasks);
router.get("/task/getById/:id", getTaskById);
router.get("/task/getByPlantId/:plantId", getTasksByPlantId);
router.post("/task/save", saveTask);
router.put("/task/update/:id", updateTask);
router.delete("/task/delete/:id", deleteTask);
router.get("/userPlant/getAll", getPlants);
router.get("/userPlant/getByEmailId/:userEmail", getPlantsByEmailId);
router.post("/userPlant/save", upload.single('image'), savePlant);
router.put("/userPlant/update/:id", upload.single('image'), updatePlant);
router.delete("/userPlant/delete/:id", deletePlant);
router.get("/plant/getAll", getAll);
router.get("/plant/getById/:id", getById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

module.exports = router