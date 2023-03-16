import { useState, useEffect } from 'react'
import { BankModel } from '../../domain/models/bank.model';
import { bankUseCase } from '../../domain/useCases/bank.useCase';
import { bankRepositoryImpl } from '../../infraestructure/repositoriesImpl/bank.repositoryImpl'
import useSqliteViewModel from './db.lite.viewModel';

function useBankListViewModel() {
    const [bankList, setBankList] = useState<BankModel | any>();
    const [loading, setLoading] = useState<boolean>(false);
    const bankService = bankUseCase(bankRepositoryImpl());

    const {
        getDBConnection,
        insertInto,
        selectFrom
    } = useSqliteViewModel();

    const storeInformation = async (banks: BankModel) => {
        const db = await getDBConnection();
        for (const index in banks) {
            const newRegister = {
                db,
                bankName: banks[index].bankName,
                description: banks[index].description,
                age: banks[index].age,
                url: banks[index].url
            }
            await insertInto(newRegister)
        }
        db.close();
    }

    const getDataFromServer = async () => {
        try {
            const response = await bankService.getListBanks()
            storeInformation(response)
            setBankList(response)
        } catch (error) {
            console.log("Error in geData: ", error)
        }
    }

    const getData = async () => {
        setLoading(true)
        try {
            const db = await getDBConnection();
            const exists = await selectFrom(db)
            console.log(exists ? "si existe, almacenar" : "no existe, consultar servidor")
            exists ? setBankList(exists) : getDataFromServer()
            db.close();
        } catch (error) {
            console.log("Error in getData", error)
        }
        finally {
            setLoading(false)
          
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return {
        bankList,
        loading
    }

}

export default useBankListViewModel