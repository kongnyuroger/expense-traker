import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "stiker smacher",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
        }}
      />
    </Tabs>
  );
}
