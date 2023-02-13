import { Router } from "express";
import LocationController from "../controllers/track/LocationController";
import { AdminMiddleware } from "./middleware/PermissionsMiddleware";

const router = Router()

router.post(
    '/new',
    [AdminMiddleware],
    LocationController.addLocation
)

router.get(
    '/all',
    LocationController.getLocations
)

export default router