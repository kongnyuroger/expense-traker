import { StyleSheet, Text, View } from "react-native";

export default function CreateExpense() {
  const styles = StyleSheet.create({
    totalContainer: {
      padding: 16,
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      marginBottom: 16,
    },
    totalText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    amountText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#4caf50",
    },
  });

  return (
    <View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total this month:</Text>
        <Text>$478.33</Text>
      </View>
      <Text>create expense screen</Text>
    </View>
  );
}
