import AmortizationRoutes from "@source/routes/AmortizationRoute";
import ClientRoutes from "@source/routes/ClientRoute";
import ConditionRoutes from "@source/routes/ConditionRoute";
import ContactRoutes from "@source/routes/ContactRoute";
import DocumentRoutes from "@source/routes/DocumentRoute";
import ExpenseRoutes from "@source/routes/ExpenseRoute";
import ImageRoutes from "@source/routes/ImageRoute";
import InfoRoutes from "@source/routes/InfoRoute";
import JobRoutes from "@source/routes/JobRoute";
import LawyerRoutes from "@source/routes/LawyerRoute";
import LoanRoutes from "@source/routes/LoanRoute";
import MoraRoutes from "@source/routes/MoraRoute";
import PaymentRoutes from "@source/routes/PaymentRoute";
import SocialRoutes from "@source/routes/SocialRoute";
import WalletRoutes from "@source/routes/WalletRoute";
import BaseRoutes from "@app/routes/BaseRoutes";
import ClientContactRoutes from "@source/routes/ClientContactRoute";
import PreferenceRoutes from "@source/routes/PreferenceRoute";
import LawyerPaymentRoutes from "@source/routes/LawyerPaymentRoute";

const sourceRoutes: BaseRoutes<any>[] = [
    new PreferenceRoutes(),
    new AmortizationRoutes(),
    new ClientRoutes(),
    new ConditionRoutes(),
    new ContactRoutes(),
    new DocumentRoutes(),
    new ExpenseRoutes(),
    new ImageRoutes(),
    new InfoRoutes(),
    new JobRoutes(),
    new LawyerRoutes(),
    new LoanRoutes(),
    new MoraRoutes(),
    new PaymentRoutes(),
    new SocialRoutes(),
    new WalletRoutes(),
    new ClientContactRoutes(),
    new LawyerPaymentRoutes(),
]

export default sourceRoutes;