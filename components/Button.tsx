import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  placeHolder: string;
  onPress: () => void;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0272ca",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
export default function Button({ placeHolder, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{placeHolder}</Text>
    </Pressable>
  );
}
