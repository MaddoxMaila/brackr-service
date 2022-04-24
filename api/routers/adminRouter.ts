import { Router } from "express";
import { CompanyController, TrackedObjectController } from "../controllers/auth/AdminController";
import { AllAdminMid, SuperAdminMid } from "./middleware/PermissionsMid";

const router = Router()

router.post(
    '/company/create',
    [SuperAdminMid],
    CompanyController.addNewCompany
)

router.delete(
    '/company/delete',
    [SuperAdminMid],
    CompanyController.deleteCompany
)

router.post(
    '/object/new',
    [AllAdminMid],
    TrackedObjectController.addNewTrackedObject
)

router.post(
    '/object/delete',
    [AllAdminMid],
    TrackedObjectController.deleteTrackedObject
)

export default router