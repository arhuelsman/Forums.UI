import { User } from "../../models/user-model"

export type PostRegisterRequest = {
    user: User,
    password: String
}