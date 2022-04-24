import { Router } from "express";
import LocationController from "../controllers/track/LocationController";
import { AllAdminMid } from "./middleware/PermissionsMid";

const router = Router()

router.post(
    '/new',
    [AllAdminMid],
    LocationController.addLocation
)

router.get(
    '/all',
    LocationController.getLocations
)

export default router