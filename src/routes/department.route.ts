import { Router } from "express";
import {
  createDepartment,
  deleteDepartment,
  searchThroughDepartments,
  updateDepartment,
  viewAllDepartments,
  viewSingleDepartment,
} from "../controllers";

const router = Router();

router.post("/department/create", createDepartment);
router.post("/department/update", updateDepartment);
router.post("/department/delete", deleteDepartment);
router.get("/departments", viewAllDepartments);
router.get("/departments/search", searchThroughDepartments);
router.get("/departments/:departmentId", viewSingleDepartment);

export default router;
