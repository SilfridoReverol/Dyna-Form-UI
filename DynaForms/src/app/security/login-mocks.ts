import { AppUserAuth } from "../security/app-user-auth";

export const LOGIN_MOCKS: AppUserAuth[] = [
    {
        userName: "enrique",
        password: "123456",
        bearerToken: "abi393kdkd9393ikd",
        isAuthenticated: true,
        canAccessProducts: true,
        canAddProduct: true,
        canSaveProduct: true,
        canAccessCategories: true,
        canAddCategory: false
    },
    {
        userName: "silfrido",
        password: "1234",
        bearerToken: "sd9f923k3kdmcjkhd",
        isAuthenticated: true,
        canAccessProducts: false,
        canAddProduct: false,
        canSaveProduct: false,
        canAccessCategories: true,
        canAddCategory: true
    }
];
