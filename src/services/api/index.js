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
export const getRoleApi = async () => {
  return await getaxiosInstance().get(`/api/role/get`);
};
export const getLabByCityApi = async (params) => {
  return await getaxiosInstance().post(`/api/lab/getbycityid`,params);
};
export const getCenterByLabApi = async (params) => {
  return await getaxiosInstance().post(`/api/center/getbylabid`,params);
};
export const getCenterByIdApi = async (params) => {
  return await getaxiosInstance().post(`/api/center/getbyid`,params);
};
export const getCityApi = async () => {
  return await getaxiosInstance().get(`/api/city/get`);
};
export const signinApi = async (params) => {
  return await getaxiosInstance().post(`/api/user/login`,params);
};
export const signupApi = async (params) => {
  return await getaxiosInstance().post(`/api/user/create`,params);
};
export const addHistoryApi = async (params) => {
  return await getaxiosInstance().post(`/api/transaction/report/create`,params);
};
export const updateHistoryApi = async (params) => {
  return await getaxiosInstance().post(`/api/transaction/history/edit`,params);
};
export const getPatientDetailApi = async (params) => {
  return await getaxiosInstance().get(`/api/report/transaction/patient/details/get?${objToQueryString(params)}`);
};
export const getCategoryApi = async () => {
  return await getaxiosInstance().get(`/api/categories/names/get`);
};
export const updateStatusApi = async (params) => {
  return await getaxiosInstance().post(`/api/report/status/update`,params);
};
export const getReportFormatApi = async () => {
  return await getaxiosInstance().get(`/api/reportFormat/get`);
};
export const getDoctorApi = async () => {
  return await getaxiosInstance().get(`/api/doctor/get`);
};
export const addPatientApi = async (params) => {
  return await getaxiosInstance().post(`/api/patient/create`,params);
};
export const updatePatientApi = async (params) => {
  return await getaxiosInstance().post(`/api/patient/update`,params);
};
export const getPatientByPhoneApi = async (params) => {
  return await getaxiosInstance().post(`/api/patient/getbyid`,params);
};
export const getCenterApi = async () => {
  return await getaxiosInstance().get(`/api/center/get`);
};
export const getClientApi = async () => {
  return await getaxiosInstance().get(`/api/client/get`);
};
export const getTestApi = async () => {
  return await getaxiosInstance().get(`/api/test/get`);
};
export const addTransactionApi = async (params) => {
  return await getaxiosInstance().post(`/api/transaction/create`,params);
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