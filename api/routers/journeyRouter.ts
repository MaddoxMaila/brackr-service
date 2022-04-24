import { Router } from "express";
import JourneysController from "../controllers/journeys/JourneysController";

const router = Router()

router.post(
    '/new',
    JourneysController.createJourney
)

router.post(
    '/stop',
    JourneysController.stopJourney
)

router.get(
    '/all',
    JourneysController.getAllJourneys
)

export default router