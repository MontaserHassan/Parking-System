/* eslint-disable prettier/prettier */
import User from "../core/Interfaces/user.interface";


declare global {
    namespace Express {
        interface Request {
            user?: User;
            requestNumberTrace: string;
        };
        interface Response {
            duration: any;
            locals: {
                responseData: any
            };
        };
    };
};