import axios from 'axios';

let $ = axios;
let base = '/api';

export const getUserList = params => {
  return axios.get(base + '/user/list', {params: params});
};

export const getVehicleList = params => {
  return axios.get(base + '/vehicle/list', {params: params});
};

export const addVehicle = params => {
  return axios.post(base + '/vehicle/add', params).then(res => res.data);
};

export const updateVehicleInfo = params => {
  return axios.post(base + '/vehicle/update', params).then(res => res.data);
};

export const deleteVehicle = id => {
  return axios.delete(base + '/vehicle/delete?id=' +  id);
};

export const getOrderList = params => {
  return axios.get(base + '/order/list', {params: params});
};

export const updateOrder = params => {
  return axios.post(base + '/order/update', params).then(res => res.data);
};

export const cancelOrder = id => {
  return axios.delete(base + '/order/cancel?id=' +  id);
};

export const getOfficeList = params => {
  return axios.get(base + '/office/list', {params: params});
};

export const updateOffice = params => {
  return axios.post(base + '/office/update', params).then(res => res.data);
};

export const addOffice = params => {
  return axios.post(base + '/office/add', params).then(res => res.data);
};

export const getVehicleClassList = params => {
  return axios.get(base + '/vehicleClass/list', {params: params});
};

export const addVehicleClass = params => {
  return axios.post(base + '/vehicleClass/add', params).then(res => res.data);
};

export const updateVehicleClass = params => {
  return axios.post(base + '/vehicleClass/update', params).then(res => res.data);
};

export const deleteVehicleClass = id => {
  return axios.delete(base + '/vehicleClass/delete?id=' +  id);
};

export const loginStaff = params => {
  return axios.post(base + '/auth/loginStaff', params).then(res => res.data);
};
