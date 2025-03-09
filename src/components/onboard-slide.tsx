import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { colors } from "@/utils/tailwindcss";

import Text from "./text";
import { ThemedView as View } from "./ThemedView";

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
    <View className="flex-1 justify-center w-screen">
      <Image />
      <View style={{ width: wp("70%") }}>
        <Text
          style={[
            {
              color:
                index % 2 === 0 ? colors.primary[500] : colors.secondary[500],
            },
          ]}
          weight="900"
          className="text-[30px] leading-[34px] my-[13px]"
        >
          {title}
        </Text>
        <Text className="leading-6" weight="600">
          {description}
        </Text>
      </View>
    </View>
  );
}
