
export const login = (payload) => ({ type: "LOGIN", payload })

export const loginSuccess = { type: "LOGIN_SUCCESS" }

export const loginFailure = { type: "LOGIN_FAIL" }

export const logout = { type: "LOGOUT" }

export const forgotPassword = (payload) => ({ type: "FORGOT_PASSWORD", payload })