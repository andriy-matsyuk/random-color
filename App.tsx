import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getRandomRGBArr, getTextColor } from "./utils";

export default function App() {
  const [background, setBackground] = useState("white");
  const [textColor, setTextColor] = useState("black");

  const handlePress = () => {
    const rgbArr = getRandomRGBArr();

    const [R, G, B] = rgbArr;
    setBackground(`rgb(${R}, ${G}, ${B})`);

    const textColor = getTextColor(rgbArr);
    setTextColor(textColor);
  };

  return (
    <Pressable
      style={[styles.container, { backgroundColor: background }]}
      onPress={handlePress}
    >
      <Text style={[styles.text, { color: textColor }]}>Hello there</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});
