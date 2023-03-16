import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import useSqliteViewModel from './src/ui/viewModels/db.lite.viewModel';

import BankList from './src/ui/views/bankList/index';

function App(): JSX.Element {
  useEffect(()=> {
    async function init() {
      await useSqliteViewModel().initDataBase();
    }
    init();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BankList />
    </SafeAreaView>
  );
}
export default App;