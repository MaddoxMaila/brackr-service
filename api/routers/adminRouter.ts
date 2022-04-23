import { CompanyController, TrackedObjectController } from "../controllers/auth/AdminController";
import router from "./router";

router.post(
    '/company/create',
    CompanyController.addNewCompany
)

router.delete(
    '/company/delete',
    CompanyController.deleteCompany
)

router.post(
    '/object/new',
    TrackedObjectController.addNewTrackedObject
)

router.post(
    '/object/delete',
    TrackedObjectController.deleteTrackedObject
)

export default router