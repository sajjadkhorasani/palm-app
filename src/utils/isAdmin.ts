import { User } from "next-auth"

export const isAdmin = (user: User) => {
    return user.email?.includes("admin")
}