import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [background, setBackground] = useState("white");
  const [textColor, setTextColor] = useState("black");

  const getRandomRGBArr = (): [number, number, number] => {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);

    return [R, G, B];
  };

  function getTextColor(rgb: [number, number, number]) {
    const [r, g, b] = rgb;

    const normalize = (c: number) => c / 255;
    const srgb = [r, g, b].map(normalize);

    const gammaCorrect = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

    const [rLinear, gLinear, bLinear] = srgb.map(gammaCorrect);

    const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;

    return luminance > 0.5 ? "black" : "white";
  }

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
