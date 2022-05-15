import { Router } from "express";
import LocationController from "../controllers/track/LocationController";
import { AdminMid } from "./middleware/PermissionsMid";

const router = Router()

router.post(
    '/new',
    [AdminMid],
    LocationController.addLocation
)

router.get(
    '/all',
    LocationController.getLocations
)

export default router