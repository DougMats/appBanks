import React from 'react';
import { SafeAreaView } from 'react-native';
import { DbContextProvider } from './src/ui/viewModels/db.context.viewModels';
import BankList from './src/ui/views/bankList/index';

function App(): JSX.Element {
  return (
    <DbContextProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <BankList />
      </SafeAreaView>
    </DbContextProvider>
  );
}
export default App;