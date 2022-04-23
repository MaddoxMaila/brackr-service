import JourneysController from "../controllers/journeys/JourneysController";
import router from "./router";

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