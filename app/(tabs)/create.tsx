import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Alert,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../../components/Button";
import { saveExpense } from "../../storage/expenseStorage";

export default function CreateExpense() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Grocery", value: "grocery", icon: () => <Ionicons name="cart-outline" size={18} color="#64748b" /> },
    { label: "Transport", value: "transport", icon: () => <Ionicons name="car-outline" size={18} color="#64748b" /> },
    { label: "Bills", value: "bills", icon: () => <Ionicons name="receipt-outline" size={18} color="#64748b" /> },
    { label: "Other", value: "other", icon: () => <Ionicons name="cash-outline" size={18} color="#64748b" /> },
  ]);
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSaveExpense = async () => {
    if (!date || !amount || !category) {
      Alert.alert("Missing fields", "Please fill all required fields.");
      return;
    }
    const expense = {
      id: Date.now().toString(),
      amount: Number(amount),
      category,
      date: date.toISOString(),
      note: text,
    };

    try {
      await saveExpense(expense);
      Alert.alert("Success", "Expense saved successfully!");

      // Reset form
      setAmount("");
      setCategory(null);
      setValue(null);
      setDate(new Date());
      setText("");
    } catch (error) {
      Alert.alert("Error", "Failed to save expense");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-2xl font-bold text-slate-900 mb-6">
          Add New Expense
        </Text>

        {/* Amount */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-slate-700 mb-2">
            Amount
          </Text>
          <View className="bg-white rounded-xl border border-slate-200 shadow-sm flex-row items-center px-4">
             <Text className="text-slate-400 text-lg font-bold mr-2">$</Text>
             <TextInput
              keyboardType="numeric"
              placeholder="0.00"
              className="flex-1 h-14 text-lg font-semibold text-slate-900"
              placeholderTextColor="#cbd5e1"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* Category */}
        <View className="mb-6 z-50">
          <Text className="text-sm font-semibold text-slate-700 mb-2">
            Category
          </Text>
          <DropDownPicker
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="Select category"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#e2e8f0",
              borderRadius: 12,
              height: 56,
            }}
            textStyle={{
              fontSize: 16,
              color: "#0f172a",
            }}
            dropDownContainerStyle={{
              borderColor: "#e2e8f0",
              marginTop: 4,
              borderRadius: 12,
              backgroundColor: "#ffffff",
            }}
            placeholderStyle={{
              color: "#cbd5e1",
            }}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        {/* Date */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-slate-700 mb-2">
            Date
          </Text>
          <Pressable
            onPress={() => setShow(true)}
            className="bg-white rounded-xl border border-slate-200 h-14 justify-center px-4 shadow-sm"
          >
            <View className="flex-row items-center">
               <Ionicons name="calendar-outline" size={20} color="#64748b" style={{ marginRight: 10 }} />
               <Text className={date ? "text-slate-900 text-base" : "text-slate-400 text-base"}>
                {date ? date.toDateString() : "Select date"}
              </Text>
            </View>
          </Pressable>

          {show && (
            <View className="bg-white p-4 rounded-xl mt-2 border border-slate-200 shadow-sm">
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={onChange}
                textColor="#0f172a"
                accentColor="#4f46e5"
              />
            </View>
          )}
        </View>

        {/* Note */}
        <View className="mb-8">
          <Text className="text-sm font-semibold text-slate-700 mb-2">
            Note (Optional)
          </Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="What was this for?"
            multiline
            className="bg-white rounded-xl border border-slate-200 p-4 text-base text-slate-900 h-32 shadow-sm"
            placeholderTextColor="#cbd5e1"
            textAlignVertical="top"
          />
        </View>

        {/* Button */}
        <Button placeHolder="Save Expense" onPress={handleSaveExpense} />
      </ScrollView>
    </SafeAreaView>
  );
}

