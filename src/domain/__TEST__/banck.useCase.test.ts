import { BankRepository } from "../repositories/bank.repositories"
import { bankUseCase } from "../useCases/bank.useCase"

const bankRepositiryMock: jest.Mocked<BankRepository> = {
    getListBanks: jest.fn(),
}
describe('Use cases for listing banks', () => {
    test('Use case to obtain the list of banks', () => {
        const { getListBanks } = bankUseCase(bankRepositiryMock);
        getListBanks()
        expect(bankRepositiryMock.getListBanks).toBeCalledTimes(1)
        expect(bankRepositiryMock.getListBanks).lastCalledWith()
    })
})