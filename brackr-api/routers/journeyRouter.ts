import { Router } from "express";
import JourneysController from "../controllers/journeys/JourneysController";
import { DriverMiddleware } from "./middleware/PermissionsMiddleware";

const router = Router()

router.post(
    '/new',
    [DriverMiddleware],
    JourneysController.createJourney
)

router.post(
    '/stop',
    [DriverMiddleware],
    JourneysController.stopJourney
)

router.get(
    '/all',
    [DriverMiddleware],
    JourneysController.getAllJourneys
)

export default router