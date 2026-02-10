import { Pressable, Text } from "react-native";

type Props = {
  placeHolder: string;
  onPress: () => void;
};

export default function Button({ placeHolder, onPress }: Props) {
  return (
    <Pressable
      className="bg-indigo-600 p-4 rounded-xl active:bg-indigo-700 active:opacity-90 shadow-sm"
      onPress={onPress}
    >
      <Text className="text-white text-lg font-bold text-center">
        {placeHolder}
      </Text>
    </Pressable>
  );
}

