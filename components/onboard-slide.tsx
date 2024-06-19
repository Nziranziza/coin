import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { primaryColor, secondaryColor, textColor } from "@/constants/Colors";

import Text from "./text";

type OnboardProp = {
  Image: React.ComponentType;
  title: string;
  description: string;
  index: number;
};

export default function OnboardSlide({
  Image,
  title,
  description,
  index,
}: OnboardProp) {
  return (
    <View style={styles.container}>
      <Image />
      <View style={{ width: wp("70%") }}>
        <Text
          style={[
            styles.title,
            { color: index % 2 === 0 ? primaryColor : secondaryColor },
          ]}
          weight="900"
        >
          {title}
        </Text>
        <Text style={styles.description} weight="600">
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: wp("100%"),
  },
  title: {
    fontSize: 30,
    lineHeight: 34,
    marginVertical: 13,
  },
  description: {
    color: textColor,
    lineHeight: 24,
    fontSize: 16,
  },
});
