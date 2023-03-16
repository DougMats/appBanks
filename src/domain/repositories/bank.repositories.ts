import {BankModel} from '../../domain/models/bank.model';
export interface BankRepository{
    getListBanks(): Promise<BankModel>;
}