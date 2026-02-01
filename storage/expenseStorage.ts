import AsyncStorage from "@react-native-async-storage/async-storage";

const EXPENSES_KEY = "expenses";

export async function getExpenses() {
  const data = await AsyncStorage.getItem("expreses");
  return data ? JSON.parse(data) : [];
}

export async function saveExpense(expens: any) {
  const expenses = await AsyncStorage.getItem("expenses");
  const updatedExpenses = [...expenses, expens];
  await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
}
