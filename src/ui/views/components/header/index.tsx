import { StyleSheet, StatusBar, View, Text, Image } from "react-native";
function Header() {
  const user = {
    name: "User Developer",
    photoUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
  }
  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={'#800480'} barStyle='light-content' translucent={false} />
      <View style={styles.avatarWrap}>
        <Image source={{ uri: user?.photoUrl }} style={styles.avatarImg} />
      </View>
      <View style={styles.dataWrap}>
        <Text style={styles.greeting}>Hello, </Text>
        <Text style={styles.name}>{user?.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#800480",
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 40,
    flexDirection: "row"
  },
  avatarWrap: {
    overflow: "hidden",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarImg: {
    flex: 1
  },
  dataWrap: {
    height: 40,
    paddingHorizontal: 10,
    flexDirection: "column"
  },
  greeting: {
    color: "#FFF",
    fontSize: 14
  },
  name: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
})
export default Header;