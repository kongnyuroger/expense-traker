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
    Container: {
      flex: 1,
      padding: 20,
      justifyContent: "space-between",
    },
    input: {
      fontSize: 18,
      padding: 20,
      borderRadius: 10,
      backgroundColor: "white",
      fontWeight: "bold",
    },
    pickercontainer: {
      padding: 16,
    },
    picker: {
      backgroundColor: "#f2f2f2",
    },
  });

  return (
    <View style={styles.Container}>
      <View>
        <Text>Amount</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter Amount"
        />
      </View>
      <View>
        <Text>Category</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select category"
          style={{
            borderColor: "#ccc",
            borderRadius: 10,
            minHeight: 20,
            height: 50,

            backgroundColor: "white",
          }}
          dropDownContainerStyle={{
            borderColor: "#ccc",
            borderRadius: 10,
          }}
          textStyle={{
            fontSize: 15,
          }}
          placeholderStyle={{
            color: "#9ca3af",
          }}
        />
      </View>
      <View>
        <Pressable
          onPress={() => setShow(true)}
          style={{
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 10,
            padding: 14,
          }}
        >
          <Text style={{ color: date ? "#111" : "#9ca3af" }}>
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

      <View>
        <Text>Note</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Write your message..."
          multiline
          numberOfLines={4}
          style={{
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 10,
            padding: 14,
            textAlignVertical: "top", // important for Android
          }}
        />
      </View>
      <View>
        <Button placeHolder="Save Expense" onPress={onPress} />
      </View>
    </View>
  );
}
