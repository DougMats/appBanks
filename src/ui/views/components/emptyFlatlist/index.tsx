import { StyleSheet, View, Text } from "react-native";

interface EmptyProps {
  message: string,
}

function EmptyFlatlist({ message }: EmptyProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop:40,
    borderColor: "#AAB7B8",
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "dashed",
    padding: 15,
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
  },
  text: {
    color: "#AAB7B8",
    fontSize: 14,
  }
})
export default EmptyFlatlist;