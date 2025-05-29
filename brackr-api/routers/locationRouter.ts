import { Router } from "express";
import LocationController from "../controllers/track/LocationController";
import { TrackedObjectController } from "../controllers/auth/AdminController";
import { AllAdminMiddleware, DriverMiddleware } from "./middleware/PermissionsMiddleware";

const router = Router()

router.post(
    '/new',
    [AllAdminMiddleware],
    LocationController.addLocation
)
router.get(
    '/object/all',
    [DriverMiddleware],
    TrackedObjectController.getAllTrackedObjects
)

router.get(
    '/all',
    LocationController.getLocations
)

export default router