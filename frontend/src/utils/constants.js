const baseRoot = '/api';

//API endpoints
const apiRoot = baseRoot + '/main';
export const ApiRoutes = Object.freeze({
  USERS: apiRoot + '/database/users',
  PROXY: apiRoot + '/database/proxy',
  ROLES: apiRoot + '/database/roles',
  AUTH_SOURCES: apiRoot + '/environment/auth_source'
});

const downloadRoot = baseRoot + '/download';
export const DownloadRoutes = Object.freeze({
  CSV: downloadRoot + '/csvTemplate'
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

export const FormLists = Object.freeze({
  SCHOOL_DISTRICTS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  NAME_OPTIONS: ['ROLES', 'DISPLAYNAME', 'EDW_MASKING_USER_DISTRICT', 'EDW_MASKING_USER_SCHOOL', 'ENCRYPTED_ODBC_PASSWORD', 'PORTALPATH'],
  SCHOOLS: ['School A', 'School B', 'School C', 'School D'],
  PROXY_LEVEL: []
});
