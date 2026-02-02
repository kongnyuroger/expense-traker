import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { getExpenses } from "../../storage/expenseStorage";

import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function CreateExpense() {
  const [expenses, setExpenses] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, []),
  );

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  useEffect(() => {
    console.log("Updated expenses:", expenses);
  }, [expenses]);

  const loadExpenses = async () => {
    const storedExpenses = await getExpenses();
    setExpenses(storedExpenses);
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
        <Text style={styles.amountText}>${total.toFixed(2)}</Text>
      </View>
      <View style={styles.expenseItem}>
        <Text style={styles.itemText}>Recent expenses</Text>
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={[styles.itemText, styles.priceText]}>
                ${item.amount}
              </Text>

              <Text style={styles.itemText}>{item.category}</Text>

              <Text style={styles.itemText}>
                {new Date(item.date).toDateString()}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          placeHolder="+ Add Expense"
          onPress={() => console.log("hello")}
        />
      </View>
    </View>
  );
}
