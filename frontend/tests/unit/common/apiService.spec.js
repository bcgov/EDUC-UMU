import axios from 'axios';
import apiService from '@/common/apiService';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(apiService.apiAxios);

describe('getUsers()', () => {

    test('get from endpoint', async () => {
        const res = apiService.getUsers();

        expect(res).toBeDefined();
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});
