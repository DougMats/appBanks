import { useState, useEffect } from 'react'
import { BankModel } from '../../domain/models/bank.model';
import { bankUseCase } from '../../domain/useCases/bank.useCase';
import { bankRepositoryImpl } from '../../infraestructure/repositoriesImpl/bank.repositoryImpl'
import { useDbContextViewModel } from './db.context.viewModels';
import useSqliteViewModel from './db.lite.viewModel';

function useBankListViewModel() {
    const [bankList, setBankList] = useState<BankModel | any>();
    const [loading, setLoading] = useState<boolean>(false);
    const bankService = bankUseCase(bankRepositoryImpl());
    const db = useDbContextViewModel()

    const {
        insertInto,
        selectFrom,
    } = useSqliteViewModel();

    const storeInformation = async (banks: BankModel) => {
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
    }

    const getDataFromServer = async () => {
        try {
            const response = await bankService.getListBanks();
            storeInformation(response);
            setBankList(response);
        } catch (error) {
            console.log("Error in geData: ", error);
        }
    }

    const getData = async () => {
        setLoading(true);
        try {
            const exists = await selectFrom(db)
            console.log(exists.length > 0 ? "Si existen registros en base de datos local." : "consultando registros en el servidor.")
            exists.length > 0 ? setBankList(exists) : getDataFromServer();
        } catch (error) {
            console.log("Error in getData", error)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return {
        bankList,
        loading,
    }
}

export default useBankListViewModel;