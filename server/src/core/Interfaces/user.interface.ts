/* eslint-disable prettier/prettier */
import UserRole from './userRoles.interface';



export default interface AuthUser {
    email: string;
    userName: string;
    userId: string;
    tokenId: number;
    currentUser: boolean,
    expiryDate: Date;
    role: UserRole;
};