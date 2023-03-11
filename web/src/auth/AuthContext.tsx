import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { User } from "../types/User";

export type AuthContextType = {
    user: User | null
    signin: (email: string, password: string) => Promise<boolean>
    signout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)