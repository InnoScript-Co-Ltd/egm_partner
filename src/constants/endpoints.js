/** env[0] = Local | env[1] = Production */

import { baseUrl } from "./config";

export const endpoints = {
    login: 'auth/login',
    changePassword: "auth/change-password",
    paymentPassword: "auth/payment-password",
    profile: "auth/profile",
    account: "account",
    accountInfo: "account/info",
    accountKYC: "account/kyc",
    bankAccount: "bank-account",
    image: `${baseUrl}/storage/images`,
    status: "status",
    referral: "referral",
    depositPackage: "deposit-package",
    merchantBankAccount: "merchant-bank-account",
    deposit: "deposit",
    transaction: "transaction",
    dashboard: "dashboard",
    agent: 'agent'
}