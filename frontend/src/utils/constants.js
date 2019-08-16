const baseRoot = '/api';

//API endpoints
const apiRoot = baseRoot + '/v1';
export const ApiRoutes = Object.freeze({
  DATABASE: apiRoot + '/database'
});

//Authentication endpoints
const authRoot = baseRoot + '/auth';
export const AuthRoutes = Object.freeze({
  LOGIN: authRoot + '/login',
  LOGOUT: authRoot + '/logout',
  REFRESH: authRoot + '/refresh',
  TOKEN: authRoot + '/token'
});

export const FieldValidations = Object.freeze({
  ACRONYM_MAX_LENGTH: 30,
  ACRONYM_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 120,
  DESCRIPTION_MAX_LENGTH: 2000,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 60
});
