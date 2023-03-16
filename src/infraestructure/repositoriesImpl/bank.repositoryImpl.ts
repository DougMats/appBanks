import { AxiosResponse } from "axios";
import { BankModel } from "../../domain/models/bank.model";
import { BankRepository } from "../../domain/repositories/bank.repositories";
import { getListBanksProvider } from "../providers/bank.provider";

export function bankRepositoryImpl(): BankRepository {
    return {
        getListBanks(): Promise<BankModel> {
            return new Promise<BankModel>(async (resolve, reject) => {
                try {
                    const response: AxiosResponse<BankModel> = await getListBanksProvider()
                    resolve(response.data)
                } catch (error) {
                    console.log("Error in bankRepositoryImpl: ", error)
                    reject(error)
                }
            })
        }
    }
}