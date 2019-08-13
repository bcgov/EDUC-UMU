const Database = require('../../../src/db/Database');

const database = new Database();

describe('userFunctions', () => {
    test('should have more than one entry', async () => {
        let userRes = await database.selectUsers();
        expect(userRes).not.toHaveLength(1);
    });//make sure we are getting an array, not a single error
});

describe('roleFunctions', () => {
    test('should have more than one role', async () => {
        let roleRes = await database.selectRole();
        expect(roleRes).not.toHaveLength(1);
    });
});

describe('proxyFunctions', () => {
    test('should hae more than one proxy', async () => {
        let proxyRes = await database.selectProxies();
        expect(proxyRes).not.toHaveLength(1);
    });
});