import { AxiosResponse, AxiosRequestHeaders } from "axios";
import { BankEntity } from "../../../domain/entities/bank.entity";

export const bankDetailResponse: AxiosResponse<BankEntity, any> = {
    data: {
        bankName: '',
        description: '',
        age: 0,
        url: '',
    },
    statusText: 'OK',
    status: 200,
    headers: {},
    config: {
        headers:<AxiosRequestHeaders> {
            'Content-Type': 'application/json'
        }
    }
}