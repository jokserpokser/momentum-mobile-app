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

  const [mainTask, setMainTask] = useState("");
  const [inputMainTask, setInputMainTask] = useState("");

  const handleSubmitName = () => {
    setName(inputName);
  };

  const handleSubmitMainTask = () => {
    setMainTask(inputMainTask);
  };

  const handleEditName = () => {
    setName('');
  };

  return (
    <View
      className={`h-screen flex flex-col justify-center ${
        colorScheme === "light" ? "bg-gray-100" : "bg-neutral-900"
      }`}
    >
      <View className="absolute top-0">
        <Text
          className={`mt-14 text-4xl font-bold text-center w-screen text-blue-700 ${
            colorScheme === "light" ? "text-black" : "text-white"
          }`}
        >
          Momentum App
        </Text>
        {/* Name Greeting Container */}
        {name && (
          <View
            className={`flex flex-row justify-center items-center text-2xl text-center w-screen mt-3 ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            <Text className="text-2xl">Hello, </Text>
            <Pressable className="mt-1" onPress={handleEditName}>
              <Text className="text-2xl border-b">{name}!</Text>
            </Pressable>
          </View>
        )}
        {/* Main Task Container */}
        {mainTask && name && (
          <View className="flex items-center absolute w-screen h-screen justify-center">
            <Text className="text-center">Your Main Task for Today</Text>
            <Pressable className="bg-blue-700 mt-3 py-4 w-5/6 rounded-lg" onPress={() => {setMainTask("")}}>
              <Text className="text-4xl text-center text-white ">
                {mainTask}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Question Name Container */}
      {!name && (
        <View
          className={`flex items-center justify-center  mx-10 rounded-lg p-3 h-52 shadow-lg ${
            colorScheme === "light" ? "bg-white" : "bg-neutral-800"
          }`}
        >
          <Text
            className={`text-lg font-bold ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            What should we call you?
          </Text>
          <TextInput
            className={`border-b w-5/6 text-center text-md  mt-10 ${
              colorScheme === "light"
                ? "border-black text-black"
                : "border-white text-white"
            }`}
            placeholder="Enter your First Name"
            placeholderTextColor={
              colorScheme === "light" ? "#b0b0b0" : "#808080"
            }
            value={inputName}
            onChangeText={(text) => {
              setInputName(text);
            }}
          />
          <Pressable
            className="bg-blue-700 mt-5 py-2 rounded-md"
            onPress={handleSubmitName}
          >
            <Text
              className={`text-lg font-bold px-10 text-white
              `}
            >
              Enter
            </Text>
          </Pressable>
        </View>
      )}

      {/* Question Main Task Container */}
      {!mainTask && name && (
        <View
          className={`flex items-center justify-center  mx-10 rounded-lg p-3 h-52 shadow-lg ${
            colorScheme === "light" ? "bg-white" : "bg-neutral-800"
          }`}
        >
          <Text
            className={`text-lg font-bold ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            What is your main task for today?
          </Text>
          <TextInput
            className={`border-b w-5/6 text-center text-md  mt-10 ${
              colorScheme === "light"
                ? "border-black text-black"
                : "border-white text-white"
            }`}
            placeholder="Enter your First Name"
            placeholderTextColor={
              colorScheme === "light" ? "#b0b0b0" : "#808080"
            }
            value={inputMainTask}
            onChangeText={(text) => {
              setInputMainTask(text);
            }}
          />
          <Pressable
            className="bg-blue-700 mt-5 py-2 rounded-md"
            onPress={handleSubmitMainTask}
          >
            <Text
              className={`text-lg font-bold px-10 text-white
              `}
            >
              Enter
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  enterButton: {
    backgroundColor: "red",
  },
});
