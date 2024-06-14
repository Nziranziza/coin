import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import React from "react";
import OnboardSlides from "@/components/onboard-slides";
import { onboadingSlidesData } from "@/constants/onboarding-slides";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import StandardButton from "@/components/standard-button";
import Dot from "@/components/dot";

export default function onboard() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{flex: 1,width:wp("100%") }}
        data={onboadingSlidesData}
        renderItem={({ item }) => (
          <OnboardSlides
            title={item.title}
            Image={item.Image}
            description={item.description}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        onViewableItemsChanged={({ viewableItems: [{index}] }) => console.log(index)}
      />
      <View>
      <StandardButton title="Next"/>
      <View>
      <Dot/>
      </View>
      </View>
    </SafeAreaView>
  );
}
