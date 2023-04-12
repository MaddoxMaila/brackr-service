import { Router } from "express";
import { CompanyController, TrackedObjectController } from "../controllers/auth/AdminController";
import { AdminMiddleware, AllAdminMiddleware, SuperAdminMiddlware } from "./middleware/PermissionsMiddleware";

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
    [AdminMiddleware],
    TrackedObjectController.addNewTrackedObject
)

router.post(
    '/object/delete',
    [AdminMiddleware],
    TrackedObjectController.deleteTrackedObject
)

export default router