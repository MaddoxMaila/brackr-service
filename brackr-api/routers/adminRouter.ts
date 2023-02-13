import { Router } from "express";
import { CompanyController, TrackedObjectController } from "../controllers/auth/AdminController";
import { AllAdminMiddleware, SuperAdminMiddlware } from "./middleware/PermissionsMiddleware";

const router = Router()

router.post(
    '/company/create',
    [SuperAdminMiddlware],
    CompanyController.addNewCompany
)

router.delete(
    '/company/delete',
    [SuperAdminMiddlware],
    CompanyController.deleteCompany
)

router.post(
    '/object/new',
    [AllAdminMiddleware],
    TrackedObjectController.addNewTrackedObject
)

router.post(
    '/object/delete',
    [AllAdminMiddleware],
    TrackedObjectController.deleteTrackedObject
)

export default router