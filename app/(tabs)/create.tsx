import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../../components/Button";

export default function CreateExpense() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Grocery", value: "grocery" },
    { label: "Transport", value: "transport" },
    { label: "Bills", value: "bills" },
  ]);
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onPress = () => {
    console.log("presable");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f9fafb",
    },

    field: {
      marginBottom: 16,
    },

    label: {
      fontSize: 14,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 6,
    },

    input: {
      height: 56,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#e5e7eb",
      fontSize: 16,
      color: "#111827",
    },

    multiline: {
      height: 120,
      paddingTop: 10,
      textAlignVertical: "top",
    },

    pressable: {
      height: 56,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      backgroundColor: "#fff",
      paddingHorizontal: 16,
      justifyContent: "center",
    },

    footer: {
      marginTop: "auto",
    },
  });

  return (
    <View style={styles.container}>
      {/* Amount */}
      <View style={styles.field}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter amount"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* Category */}
      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <DropDownPicker
          open={open}
          value={category}
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
          placeholder="Select category"
          style={{
            height: 56,
            borderRadius: 12,
            borderColor: "#e5e7eb",
            backgroundColor: "#fff",
          }}
          dropDownContainerStyle={{
            borderRadius: 12,
            borderColor: "#e5e7eb",
          }}
          textStyle={{
            fontSize: 16,
            color: "#111827",
          }}
          placeholderStyle={{
            color: "#9ca3af",
          }}
        />
      </View>

      {/* Date */}
      <View style={styles.field}>
        <Text style={styles.label}>Date</Text>
        <Pressable style={styles.pressable} onPress={() => setShow(true)}>
          <Text style={{ color: date ? "#111827" : "#9ca3af", fontSize: 16 }}>
            {date ? date.toDateString() : "Select date"}
          </Text>
        </Pressable>

        {show && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
          />
        )}
      </View>

      {/* Note */}
      <View style={styles.field}>
        <Text style={styles.label}>Note</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Write a note..."
          multiline
          style={[styles.input, styles.multiline]}
        />
      </View>

      {/* Button */}
      <View style={styles.footer}>
        <Button placeHolder="Save Expense" onPress={onPress} />
      </View>
    </View>
  );
}
