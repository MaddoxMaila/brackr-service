import { CompanyController } from "../controllers/auth/AdminController";
import router from "./router";

router.post(
    '/company/create',
    CompanyController.addNewCompany
)

router.delete(
    'company/:companyId/delete',
    CompanyController.deleteCompany
)

export default router