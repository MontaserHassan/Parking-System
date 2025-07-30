/* eslint-disable prettier/prettier */
import 'express';


declare global {
    namespace Express {
        interface Request {
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