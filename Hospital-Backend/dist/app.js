"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_handler_1 = __importDefault(require("./helpers/error-handler"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load env vars as early as possible so config/db sees them
dotenv_1.default.config();
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const oauth_routes_1 = __importDefault(require("./routes/oauth.routes"));
const staff_route_1 = __importDefault(require("./routes/staff.route"));
const staffDetails_routes_1 = __importDefault(require("./routes/staffDetails.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const bankDeposit_routes_1 = __importDefault(require("./routes/bankDeposit.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const schedule_route_1 = __importDefault(require("./routes/schedule.route"));
const PatientDiagnosisRoute_1 = __importDefault(require("./routes/PatientDiagnosisRoute"));
const payment_routes_2 = __importDefault(require("./routes/payment.routes"));
const insurance_route_1 = __importDefault(require("./routes/insurance.route"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || '3000');
        this.init();
    }
    init() {
        this.initConfig();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
    }
    initConfig() {
        new db_1.default();
    }
    initMiddlewares() {
        // Configure CORS to allow the frontend and credentials for cookie-based flows
        const origin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
        this.app.use((0, cors_1.default)({ origin, credentials: true }));
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)('combined'));
        this.app.use((0, cookie_parser_1.default)());
    }
    initRoutes() {
        this.app.use('/api/v1/staff', staff_route_1.default);
        this.app.use('/api/v1/auth', AuthRoutes_1.default);
        this.app.use('/api/v1/auth', oauth_routes_1.default);
        this.app.use('/api/v1/staff-details', staffDetails_routes_1.default);
        this.app.use('/api/v1/appointments', appointment_routes_1.default);
        this.app.use('/api/v1/submit-bank-deposit', bankDeposit_routes_1.default);
        this.app.use('/api/v1/create-payment-intent', payment_routes_1.default);
        this.app.use('/api/v1/staff/:staffId/schedule', schedule_route_1.default);
        this.app.use("/api/v1/patient-diagnosis", PatientDiagnosisRoute_1.default);
        this.app.use('/api/v1/payment', payment_routes_2.default);
        this.app.use('/api/insurance', insurance_route_1.default);
        this.app.use("/api/v1/profile", profile_routes_1.default);
    }
    initErrorHandling() {
        this.app.use(error_handler_1.default.notFound);
        this.app.use(error_handler_1.default.serverError);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
