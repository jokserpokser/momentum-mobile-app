import { useEffect, useState } from "react";
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
  Animated,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();

  type TodoItem = {
    addItemInput: string;
    isDone: boolean;
    fadeAnimListItem: Animated.Value;
  };

  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const [addItemInput, setAddItemInput] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  const dynamicTextColor =
    colorScheme === "light" ? "text-black" : "text-white";

  const dynamicBackgroundColor =
    colorScheme === "light" ? "bg-white" : "bg-neutral-800";

  //Animation Function
  const fadeIn = (animatedValue: Animated.Value) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
  };

  const handleAddItem = () => {
    if (!addItemInput.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    setButtonStatus(true);
    // Animation initial opacity value
    const fadeAnimListItem = new Animated.Value(0);
    fadeIn(fadeAnimListItem).start(() => setButtonStatus(false));
    setTodoList([{ addItemInput, isDone, fadeAnimListItem }, ...todoList]);
    setAddItemInput("");
  };

  const handleTaskDone = (itemIndex: number) => {
    const newArray = [...todoList];
    newArray[itemIndex].isDone = !newArray[itemIndex].isDone;
    setTodoList(newArray);
  };

  const handleTaskDelete = (itemIndex: number) => {
    const newArray = [...todoList];
    newArray.splice(itemIndex, 1);
    setTodoList(newArray);
  };

  //Get Tasks
  useEffect(() => {
    const getTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks !== null) {
          const parsedTasks = JSON.parse(storedTasks);
          parsedTasks[0].fadeAnimListItem = new Animated.Value(1);
          setTodoList(parsedTasks);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, []);

  //Save Tasks
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(todoList));
      } catch (error) {
        console.error(error);
      }
    };

    saveTasks();
  }, [todoList]);

  return (
    <View
      className={`${dynamicBackgroundColor} flex items-center h-screen w-screen`}
    >
      <Text
        className={`mt-14 text-4xl font-bold text-center w-screen text-blue-500`}
      >
        Todos
      </Text>
      <Text
        className={`${dynamicTextColor} py-2 border-b border-blue-500 w-screen text-center`}
      >
        Press Task to indicate Done
      </Text>
      {/* List Container */}
      <ScrollView
        style={{
          paddingHorizontal: 30,
          paddingVertical: 15,
          backgroundColor:
            colorScheme === "light" ? "rgb(229, 231, 235)" : "rgb(10 10 10)",
          width: "100%",
        }}
        contentContainerStyle={
          todoList.length === 0 && {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }
        }
      >
        {todoList.length === 0 && (
          <Text className="text-neutral-500 text-2xl text-center">
            No Tasks
          </Text>
        )}
        {todoList &&
          todoList.map((item, index) => (
            <Animated.View
              key={index}
              style={{ opacity: item.fadeAnimListItem }}
              className="flex flex-row my-2 w-full"
            >
              <Pressable
                className={`${
                  item.isDone ? "bg-green-400 opacity-15" : dynamicBackgroundColor
                } flex flex-row items-center justify-between  shadow-lg rounded-tl-lg rounded-tr-lg rounded-br-lg w-full rounded-bl-lg`}
                onPress={() => handleTaskDone(index)}
              >
                <Text
                  className={`text-xl py-3 px-6 ${
                    item.isDone ? "line-through text-green-700" : ""
                  } ${dynamicTextColor} `}
                >
                  {item.addItemInput}
                </Text>
                <Pressable
                  className="justify-center py-2 pr-3 rounded-tr-lg rounded-br-lg"
                  onPress={() => {
                    handleTaskDelete(index);
                  }}
                >
                  <Text className="text-center text-red-400 text-3xl font-bold">
                    {" "}
                    X{" "}
                  </Text>
                </Pressable>
              </Pressable>
            </Animated.View>
          ))}
      </ScrollView>

      {/* Input Container */}
      <View
        className={`${dynamicBackgroundColor} border-t border-blue-500 flex items-center py-3 px-6 pb-32 shadow-lg w-screen rounded-md`}
      >
        <Text className="text-blue-500 text-2xl text-center font-semibold">
          Add Task
        </Text>
        <TextInput
          className={`${
            colorScheme === "light"
              ? "border-black text-black"
              : "border-blue-500 text-white"
          } border-b text-center w-11/12`}
          placeholder="-- Input Task Here --"
          placeholderTextColor={"gray"}
          value={addItemInput}
          onChangeText={(text) => {
            setAddItemInput(text);
          }}
        />
        <Pressable
          className="bg-blue-500 w-3/5 mt-3 py-3 rounded-lg"
          disabled={buttonStatus}
          onPress={handleAddItem}
        >
          <Text className="text-white font-bold text-center">Add</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
