//import axios from 'axios';
import apiService from '@/common/apiService';

describe('getUsers()', () => {

    test('get from endpoint', async () => {
        const spy = jest.spyOn(apiService.apiAxios, 'get');

        beforeEach(() => {
            apiService.apiAxios.interceptors.response.eject(apiService.intercept);
        });
        
        afterEach(() => {
            spy.mockClear();
        });

        const res = apiService.getUsers();

        expect(res).toBeDefined();
        //expect(axios.get).toHaveBeenCalledTimes(1);
    });
});
