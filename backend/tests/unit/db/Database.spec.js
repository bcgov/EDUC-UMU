const Database = require('../../../src/db/Database');

const database = new Database();

describe('userFunctions', () => {
    let userRes = await database.selectUsers();
    expect(userRes).not.toHaveLength(1);//make sure we are getting an array, not a single error
});

describe('roleFunctions', () => {
    let roleRes = await database.selectRole();
    expect(roleRes).not.toHaveLength(1);
});

describe('proxyFunctions', () => {
    let proxyRes = await database.selectProxies();
    expect(proxyRes).not.toHaveLength(1);
});