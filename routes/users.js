import express from "express";
import {
  getEstabelecimentos,
  creatEstabelicimento,
  getcustomers,
  updateStatus,
  getCategorias,
  getUserByLoginAndPassword,
  getRoles,
  filterCategory,
  editCustomer,
  getCustomerById,
  getcustomersByPage,
  getStatus,
  getProfilePicture,
  editProfilePicture,
  editPhotos,
  getFotos
} from "../controllers/user.js";

const router = express.Router();

router.get("/getEstabelecimentos", getEstabelecimentos);
router.post("/creatEstabelicimento", creatEstabelicimento);
router.get("/getcustomers", getcustomers);
router.get("/getcustomersById/:id", getCustomerById);
router.put("/deleteCustomer", updateStatus);
router.get("/getCategorias", getCategorias);
router.get("/getRoles", getRoles)
router.post("/getUserByLoginAndPassword", getUserByLoginAndPassword)
router.post("/filterCategory", filterCategory)
router.put("/editCustomer", editCustomer);
router.get("/getcustomersByPage", getcustomersByPage);
router.get("/getStatus/:id", getStatus);
router.get("/getProfilePicture/:id", getProfilePicture)
router.put("/editProfilePicture", editProfilePicture);
router.put("/editPhotos/", editPhotos);
router.get("/getFotos/:id", getFotos)

export default router;
