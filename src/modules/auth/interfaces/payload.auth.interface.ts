import { JwtPayload } from "jsonwebtoken";

export interface PayloadAuth extends JwtPayload {
    id: string;
}
