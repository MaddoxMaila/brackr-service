import { Router } from "express";
import PositionController from "../controllers/track/PositionController";

const router = Router()

router.post(
    '/new',
    PositionController.savePositionCoordinates
)

router.get(
    '/get',
    PositionController.getPositionCoordinates
)

export default router