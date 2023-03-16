
import { SafeAreaView, StyleSheet, ActivityIndicator, FlatList, View, } from "react-native";
import useBankListViewModel from "../../viewModels/bankList.viewModel";
import BankCard from "../components/bankCard";
import EmptyFlatlist from "../components/emptyFlatlist";
import Header from "../components/header";

function BankList(): JSX.Element {
  const {
    bankList,
    loading
  } = useBankListViewModel();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.wrapper}>
        {loading && <ActivityIndicator color={'purple'} size={40} />}
        {!loading &&
          <FlatList
            contentContainerStyle={styles.container}
            data={bankList}
            renderItem={({ item }) => <BankCard
              description={item?.description}
              bankName={item?.bankName}
              age={item?.age}
              url={item?.url}
            />}
            keyExtractor={(item, key) => key.toString()}
            ListEmptyComponent={
              () => (
                <EmptyFlatlist message={'OPS!... List empty.'} />
              )
            }
          />
        }
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: -20,
    backgroundColor: "#F2F3F4",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  container: {
    paddingHorizontal: 20,
  }
})
export default BankList;