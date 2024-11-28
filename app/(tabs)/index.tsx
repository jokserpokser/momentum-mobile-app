import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  useColorScheme,
  Pressable,
  Animated,
} from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  // Name
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");
  const [showQuestionNameContainer, setShowQuestionNameContainer] =
    useState(true);

  // Main Task
  const [mainTask, setMainTask] = useState("");
  const [inputMainTask, setInputMainTask] = useState("");
  const [showQuestionMainTaskContainer, setShowQuestionMainTaskContainer] =
    useState(false);
  const [showMainTask, setShowMainTask] = useState(false);

  // Animation starting opacity
  const [fadeAnimGreeting] = useState(new Animated.Value(0));
  const [fadeAnimQuestionName] = useState(new Animated.Value(1));

  const [fadeAnimMainTask] = useState(new Animated.Value(0));
  const [fadeAnimQuestionMainTask] = useState(new Animated.Value(0));

  // Animation Functions
  const fadeIn = (animatedValue: Animated.Value) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
  };

  const fadeOut = (animatedValue: Animated.Value) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });
  };

  const handleSubmitName = () => {
    if (!inputName.trim()) {
      alert("Name cannot be empty!");
      return;
    }
    setName(inputName);
    //Greeting Animation to 1
    fadeIn(fadeAnimGreeting).start();

    //Question Name Animation to 0
    fadeOut(fadeAnimQuestionName).start(() => {
      setShowQuestionNameContainer(false);
      // check if there is main task already
      if (!mainTask) {
        setShowQuestionMainTaskContainer(true);
        fadeIn(fadeAnimQuestionMainTask).start();
      } else {
        setShowMainTask(true);
        fadeIn(fadeAnimMainTask).start();
      }
    });
  };

  const handleSubmitMainTask = () => {
    if (!inputMainTask.trim()) {
      alert("Main Task cannot be empty!");
      return;
    }
    setMainTask(inputMainTask);
    fadeOut(fadeAnimQuestionMainTask).start(() => {
      setShowQuestionMainTaskContainer(false);
      setShowMainTask(true);
      fadeIn(fadeAnimMainTask).start();
    });
  };

  const handleEditName = () => {
    fadeOut(fadeAnimGreeting).start(() => {
      setShowQuestionNameContainer(true);
      fadeIn(fadeAnimQuestionName).start();
    });

    fadeOut(fadeAnimMainTask).start(() => setShowMainTask(false));

    fadeOut(fadeAnimQuestionMainTask).start(() =>
      setShowQuestionMainTaskContainer(false)
    );
  };

  useEffect(() => {
    return () => {
      fadeAnimGreeting.stopAnimation();
      fadeAnimQuestionName.stopAnimation();
      fadeAnimMainTask.stopAnimation();
      fadeAnimQuestionMainTask.stopAnimation();
    };
  }, []);

  return (
    <View
      className={`h-screen flex flex-col justify-center ${
        colorScheme === "light" ? "bg-gray-200" : "bg-neutral-900"
      }`}
    >
      <View className="absolute top-0">
        <Text
          className={`mt-14 text-4xl font-bold text-center w-screen text-blue-500`}
        >
          Momentum App
        </Text>

        {/* Name Greeting Container */}
        <Animated.View
          style={{ opacity: fadeAnimGreeting }}
          className={`flex-row justify-center items-center text-2xl text-center w-screen z-10 mt-3`}
        >
          <Text
            className={`text-2xl ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            Hello,{" "}
          </Text>
          <Pressable className="mt-1" onPress={handleEditName}>
            <Text
              className={`text-2xl border-b ${
                colorScheme === "light"
                  ? "text-black border-black"
                  : "text-white border-white"
              }`}
            >
              {name}!
            </Text>
          </Pressable>
        </Animated.View>

        {/* Main Task Container */}
        <Animated.View
          style={{ opacity: fadeAnimMainTask }}
          className={`${
            showMainTask ? "flex" : "hidden"
          } items-center absolute w-screen h-screen justify-center z-0`}
        >
          <Text
            className={`text-center ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            Your Main Task for Today
          </Text>
          <Pressable
            className="bg-blue-500 mt-3 py-4 w-5/6 rounded-lg"
            onPress={() => {
              fadeOut(fadeAnimMainTask).start(() => {
                setMainTask("");
                setShowMainTask(false);

                setShowQuestionMainTaskContainer(true);
                fadeIn(fadeAnimQuestionMainTask).start(() => {});
              });
            }}
          >
            <Text className="text-4xl text-center text-white ">{mainTask}</Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* Question Name Container */}
      <Animated.View
        style={{ opacity: fadeAnimQuestionName }}
        className={`items-center justify-center  mx-10 rounded-lg p-3 h-52 shadow-lg ${
          colorScheme === "light" ? "bg-white" : "bg-neutral-800"
        } ${showQuestionNameContainer ? "flex" : "hidden"}`}
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
              : "border-blue-500 text-white"
          }`}
          placeholder="Enter your First Name"
          placeholderTextColor={colorScheme === "light" ? "#b0b0b0" : "#808080"}
          value={inputName}
          onChangeText={(text) => {
            setInputName(text);
          }}
        />
        <Pressable
          className="bg-blue-500 mt-5 py-2 rounded-md"
          onPress={handleSubmitName}
        >
          <Text
            className={`text-lg font-bold px-10 text-white
              `}
          >
            Enter
          </Text>
        </Pressable>
      </Animated.View>

      {/* Question Main Task Container */}
      <Animated.View
        style={{ opacity: fadeAnimQuestionMainTask }}
        className={`flex items-center justify-center  mx-10 rounded-lg p-3 h-52 shadow-lg ${
          colorScheme === "light" ? "bg-white" : "bg-neutral-800"
        } ${showQuestionMainTaskContainer ? "flex" : "hidden"}`}
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
              : "border-blue-500 text-white"
          }`}
          placeholder="Enter Main Task"
          placeholderTextColor={colorScheme === "light" ? "#b0b0b0" : "#808080"}
          value={inputMainTask}
          onChangeText={(text) => {
            setInputMainTask(text);
          }}
        />
        <Pressable
          className="bg-blue-500 mt-5 py-2 rounded-md"
          onPress={handleSubmitMainTask}
        >
          <Text
            className={`text-lg font-bold px-10 text-white
              `}
          >
            Enter
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  enterButton: {
    backgroundColor: "red",
  },
});
