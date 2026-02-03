import AsyncStorage from "@react-native-async-storage/async-storage";

const EXPENSES_KEY = "expenses";

function isValidExpense(item: unknown): item is { id: string; amount: number; category: string; date: string } {
  return (
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    "amount" in item &&
    "category" in item &&
    "date" in item &&
    typeof (item as any).amount === "number"
  );
}

export async function getExpenses() {
  const data = await AsyncStorage.getItem(EXPENSES_KEY);
  if (!data) return [];

  try {
    const parsed = JSON.parse(data);
    const array = Array.isArray(parsed) ? parsed : [];
    return array.filter(isValidExpense);
  } catch {
    return [];
  }
}

export async function saveExpense(expense: any) {
  const existingExpenses = await getExpenses();
  const updatedExpenses = [...existingExpenses, expense];

  await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
}
