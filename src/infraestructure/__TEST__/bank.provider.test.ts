import Axios from 'axios';
import { getListBanksProvider } from '../providers/bank.provider';
import { bankDetailResponse } from './constants/banks';

jest.mock('axios')
const mockedAxios = Axios as jest.Mocked<typeof Axios>

describe('bank listing provider tests', () => {
    test('provider use case to get list of banks', async () => {
        mockedAxios.get.mockResolvedValue(bankDetailResponse)
        const response = await getListBanksProvider()
        expect(response).toBe(bankDetailResponse)
    })
})