import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
export default function CreateExpense() {
  const expenses = [
    {
      price: 20,
      category: "grocery",
      date: "23/1/2026",
    },
    {
      price: 50,
      category: "transport",
      date: "24/1/2026",
    },
    {
      price: 120,
      category: "utilities",
      date: "24/1/2026",
    },
    {
      price: 35,
      category: "food",
      date: "25/1/2026",
    },
    {
      price: 200,
      category: "rent",
      date: "26/1/2026",
    },
    {
      price: 15,
      category: "entertainment",
      date: "26/1/2026",
    },
    {
      price: 20,
      category: "grocery",
      date: "23/1/2026",
    },
    {
      price: 50,
      category: "transport",
      date: "24/1/2026",
    },
    {
      price: 120,
      category: "utilities",
      date: "24/1/2026",
    },
    {
      price: 20,
      category: "grocery",
      date: "23/1/2026",
    },
    {
      price: 50,
      category: "transport",
      date: "24/1/2026",
    },
    {
      price: 120,
      category: "utilities",
      date: "24/1/2026",
    },
  ];

  const hello = () => {
    console.log("hello");
  };

  const styles = StyleSheet.create({
    homeContainer: {
      flex: 1,
      justifyContent: "space-between",
      padding: 20,
      backgroundColor: "#eaeef3",
    },
    totalContainer: {
      padding: 16,
      backgroundColor: "#0272ca",
      borderRadius: 10,
    },
    totalText: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      color: "#ffffff",
    },
    amountText: {
      fontSize: 45,
      fontWeight: 900,
      color: "#ffffff",
      textAlign: "center",
    },
    expenseItem: {
      flex: 7 / 8,
    },
    item: {
      display: "flex",
      flexDirection: "row",
      marginVertical: 5,
      justifyContent: "space-between",
      padding: 10,
      paddingVertical: 15,
      backgroundColor: "white",
      borderRadius: 10,
    },
    itemText: {
      fontSize: 20,
    },
    priceText: {
      fontWeight: "bold",
    },
    itemsHeader: {},
    btnContainer: {},
  });

  return (
    <View style={styles.homeContainer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total this month:</Text>
        <Text style={styles.amountText}>$478.33</Text>
      </View>
      <View style={styles.expenseItem}>
        <Text style={styles.itemText}>Recent expenses</Text>
        <FlatList
          data={expenses}
          renderItem={({ item, index }) => (
            <View style={styles.item} key={index}>
              <Text style={[styles.itemText, styles.priceText]}>
                {"$" + item.price + "."}
              </Text>
              <Text style={styles.itemText}>{item.category + "."}</Text>
              <Text style={styles.itemText}>{item.date + "."}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button placeHolder="+ Add Expense" onPress={hello} />
      </View>
    </View>
  );
}
