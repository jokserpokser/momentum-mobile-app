import { useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  useColorScheme,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();

  type TodoItem = {
    addItemInput: string;
    isDone: boolean;
  }

  const [todoList, setTodoList] = useState<TodoItem[]>([{addItemInput: "Task1", isDone: false}]);
  const [addItemInput, setAddItemInput] = useState("");
  const [isDone, setIsDone] = useState(false);

  const handleAddItem = () => {
    setTodoList([...todoList, {addItemInput, isDone}].reverse());
    setAddItemInput("");
  };

  const handleTaskDone = (itemIndex:number) => {
    const newArray = [...todoList];
    newArray[itemIndex].isDone = !newArray[itemIndex].isDone;
    setTodoList(newArray);
  }

  return (
    <View className="bg-white flex items-center h-screen w-screen">
      <Text
        className={`mt-14 text-4xl font-bold text-center w-screen text-blue-700`}
      >
        Todos
      </Text>
      <Text className="py-2 border-b border-blue-700 w-screen text-center">
        Press Task to indicate Done
      </Text>
      {/* List Container */}
      <ScrollView
        style={{paddingHorizontal: 20, backgroundColor: "rgb(229, 231, 235)", width: "100%" }}
      >
        {todoList.map((item, index) => (
          <View key={index} className="flex flex-row mt-3 w-full">
            <Pressable
              className={`${
                item.isDone ? "bg-green-300" : "bg-white"
              } flex flex-row items-center justify-between  shadow-lg rounded-tl-lg rounded-tr-lg rounded-br-lg w-full rounded-bl-lg`}
              onPress={() => handleTaskDone(index)}
            >
              <Text className="text-lg py-3 px-6">{item.addItemInput}</Text>
              <Pressable className="justify-center py-2 rounded-tr-lg rounded-br-lg ">
                <Text className="text-center text-red-400 text-3xl font-bold"> X </Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {/* Input Container */}
      <View className="bg-white border-t border-blue-700 absolute flex items-center py-3 px-6 bottom-14 shadow-lg w-screen rounded-md">
        <Text className="text-blue-700 text-2xl text-center font-semibold">
          Add Task
        </Text>
        <TextInput
          className="border-b text-center w-11/12"
          placeholder="-- Input Task Here --"
          value={addItemInput}
          onChangeText={(text) => {
            setAddItemInput(text);
          }}
        />
        <Pressable
          className="bg-blue-700 w-3/5 mt-3 py-3 rounded-lg"
          onPress={handleAddItem}
        >
          <Text className="text-white font-bold text-center">Add</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
