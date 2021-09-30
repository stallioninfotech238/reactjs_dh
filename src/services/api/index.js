import {getaxiosInstance} from "../axiosInstance";
export const getFiltersApi = async (filterType) => {
  return await getaxiosInstance().get(`/api/${filterType}/names/getall`);
};
export const getTransactionsApi = async (params) => {
  return await getaxiosInstance().get(`/api/transactions/list/get?${objToQueryString(params)}`);
};
export const setEmergencyApi = async (params) => {
  return await getaxiosInstance().post(`/api/transaction/emergency/set`,params);
};
export const setRadiologistApi = async (params) => {
  return await getaxiosInstance().post(`/api/transaction/radiologist/assign`,params);
};
export const setApproverApi = async (params) => {
  return await getaxiosInstance().post(`/api/transaction/approver/assign`,params);
};
export const signinApi = async (params) => {
  return await getaxiosInstance().post(`/api/users/login`,params);
};
export const signupApi = async (params) => {
  return await getaxiosInstance().post(`/api/transaction/approver/assign`,params);
};

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    if(obj[key] != '')
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}
// export const RegistrationApi = async (params) => {
//   return await getaxiosInstance().post(`/registration/verifyToken`,params);
// };
// export const RegistrationMemberApi = async (params) => {
//   return await getaxiosInstance(`Bearer ${localStorage.getItem('verifyOtp')}`).post(`/registration/memberdata`,{...params,jwtToken:localStorage.getItem('verifyToken')});
// };
// export const CheckUsernameApi = async (params) => {
//   return await getaxiosInstance(`Bearer ${localStorage.getItem('verifyOtp')}`).get(`/registration/checkusername?name=${params}`);
// };
// export const LoginApi = async (params) => {
//   return await getaxiosInstance().post(`/authenticate`,params);
// };
// export const ChangePasswordApi = async (params) => {
//   return await getaxiosInstance(`Bearer ${localStorage.getItem('user')}`).post(`/changePassword`,params);
// };
// export const ForgotApi = async (params) => {
//   return await getaxiosInstance().post(`/member/forgotPassword`,params);
// };
// export const PasswordResetApi = async (params) => {
//   return await getaxiosInstance().post(`/member/passwordReset`,params);
// };
// export const RequestOtpApi = async (url) => {
//   return await getaxiosInstance(`Bearer ${localStorage.getItem('verifyToken')}`).post(`${url}/requestOTP`,{jwtToken:localStorage.getItem('verifyToken')});
// };
// export const VerifyOtpApi = async (url,token,params) => {
//   return await getaxiosInstance(token).post(`${url}/verifyOTP`,params);
// };