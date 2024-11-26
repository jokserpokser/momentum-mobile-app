import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  useColorScheme,
  Pressable,
} from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");

  const handleSubmit = (e: any) => {
    setName(inputName);
  };

  return (
    <View className="bg-neutral-900 h-screen flex flex-col justify-center">
      <View className="absolute top-0">
        <Text
          className={`mt-14 text-4xl text-center w-screen ${
            colorScheme === "light" ? "text-black" : "text-white"
          }`}
        >
          Todo App
        </Text>
        {name && (
          <Text
            className={`text-2xl text-center w-screen mt-3 ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            Hello, {name}!
          </Text>
        )}
      </View>

      {/* Name Container */}
      {!name && (
        <View className="flex items-center justify-center bg-neutral-800 mx-10 rounded-lg p-3 h-52">
          <Text
            className={`text-lg font-bold ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            What should we call you?
          </Text>
          <TextInput
            className="border-b border-white w-5/6 text-center text-md text-white mt-10"
            placeholder="Enter your First Name"
            placeholderTextColor={colorScheme === "light" ? "#000" : "#808080"}
            value={inputName}
            onChangeText={(text) => {
              setInputName(text);
            }}
          />
          <Pressable
            className="bg-neutral-700 mt-5 py-2 rounded-md"
            onPress={handleSubmit}
          >
            <Text
              className={`text-lg font-bold px-10 ${
                colorScheme === "light" ? "text-black" : "text-white"
              }`}
            >
              Enter
            </Text>
          </Pressable>
        </View>
      )}

      {/* <View className="flex items-center justify-center bg-neutral-800 mx-10 rounded-lg p-3 h-52">
        <Text>OKSPOKS</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  enterButton: {
    backgroundColor: "red",
  },
});
