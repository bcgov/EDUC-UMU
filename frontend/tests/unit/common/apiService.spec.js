import axios from 'axios';
import apiService from '@/common/apiService';

describe('getUsers()', () => {

    test('get from endpoint', async () => {
        const res = apiService.getUsers();

        expect(res).toBeDefined();
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});
