import { View, Image } from "react-native";
import React from "react";
import Logo from "./icons/logo";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { primaryColor } from "@/constants/Colors";
import StandardButton from "./standard-button";
import Text from "./text";

type OnboardProp = {
  Image: React.ComponentType;
  title: string;
  description: string;
};

export default function OnboardSlides({
  Image,
  title,
  description,
}: OnboardProp) {
  return (
    <View style={{width:wp("100%"),padding:30 }}>
      <Logo />
      <View
        style={{
          flex:1,
          justifyContent:"center",
        }}
      >
        <Image />
        <Text
          style={{
            paddingVertical: 20,
            color:primaryColor,
            fontSize:25
          }}
          weight="900"
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            width:wp("70%")
          }}
          weight="600"
        >
          {description}
        </Text>

      </View>
      {/* <View>
      <StandardButton title="Next"/>
      </View> */}
    </View>
  );
}
