import AsyncStorage from "@react-native-async-storage/async-storage";

const EXPENSES_KEY = "expenses";

export async function getExpenses() {
  const data = await AsyncStorage.getItem(EXPENSES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveExpense(expense: any) {
  const existingExpenses = await getExpenses();
  const updatedExpenses = [...existingExpenses, expense];

  await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
}
