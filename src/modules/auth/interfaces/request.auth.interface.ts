import { UserEntity } from "../../users/entity/user.entity";

export interface RequestAuth extends Request {
    user: UserEntity;
    headers: Headers & {
        authorization?: string;
    };
}
