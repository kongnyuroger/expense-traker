import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { getExpenses } from "../../storage/expenseStorage";

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
};

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "grocery":
      return "cart-outline";
    case "transport":
      return "car-outline";
    case "bills":
      return "receipt-outline";
    default:
      return "cash-outline";
  }
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  const loadExpenses = async () => {
    const storedExpenses = await getExpenses();
    setExpenses(storedExpenses);
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View className="bg-white p-4 rounded-xl mb-3 flex-row items-center shadow-sm border border-slate-100">
      <View className="bg-indigo-50 p-3 rounded-full mr-4">
        <Ionicons
          name={getCategoryIcon(item.category)}
          size={24}
          color="#4f46e5"
        />
      </View>
      <View className="flex-1">
        <Text className="text-slate-800 font-semibold text-lg capitalize">
          {item.category}
        </Text>
        <Text className="text-slate-500 text-sm">
          {new Date(item.date).toDateString()}
        </Text>
      </View>
      <Text className="text-slate-900 font-bold text-lg">
        ${item.amount.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-5 pt-6">
        {/* Header Card */}
        <View className="bg-indigo-600 p-6 rounded-2xl shadow-lg mb-8">
          <Text className="text-indigo-100 text-base font-medium mb-1">
            Total Spend (Month)
          </Text>
          <Text className="text-white text-5xl font-bold tracking-tight">
            ${total.toFixed(2)}
          </Text>
        </View>

        {/* Recent Transactions */}
        <View className="flex-1">
          <Text className="text-slate-900 text-xl font-bold mb-4">
            Recent Transactions
          </Text>
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={renderExpenseItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={
              <View className="items-center justify-center py-10">
                <Ionicons name="documents-outline" size={64} color="#cbd5e1" />
                <Text className="text-slate-400 mt-4 text-center">
                  No expenses yet. Start adding some!
                </Text>
              </View>
            }
          />
        </View>

        {/* Floating Action Button or similar if needed, but we have Tabs */}
      </View>
    </SafeAreaView>
  );
}

