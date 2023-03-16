import { BankRepository } from "../repositories/bank.repositories";


export function bankUseCase( repository: BankRepository ){
    return{
        getListBanks(){
            return repository.getListBanks();
        }
    }
}