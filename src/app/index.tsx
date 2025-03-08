import { router } from "expo-router";
import React, { useRef } from "react";
import { FlatList, SafeAreaView, Platform, StatusBar } from "react-native";

import Button from "@/components/button";
import Dot from "@/components/dot";
import Logo from "@/components/icons/logo";
import OnboardSlide from "@/components/onboard-slide";
import { ThemedView as View } from "@/components/ThemedView";
import {
  OnboardSlideData,
  onboadingSlidesData,
} from "@/constants/onboarding-slides";

const isAndroid = Platform.OS === "android";

export default function Onboard() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const flatListRef = useRef<FlatList<OnboardSlideData>>(null);

  const onNext = () => {
    if (currentIndex < onboadingSlidesData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace("/phone");
    }
  };

  const isLastSlide = currentIndex === onboadingSlidesData.length - 1;

  return (
    <SafeAreaView
      className="flex-1 pb-[30px]"
      style={isAndroid ? { paddingTop: StatusBar.currentHeight } : undefined}
    >
      <View className="px-[30px]">
        <Logo />
      </View>
      <FlatList
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        className="flex-1 w-full px-[30px]"
        data={onboadingSlidesData}
        renderItem={({ item, index }) => (
          <OnboardSlide
            title={item.title}
            Image={item.Image}
            description={item.description}
            index={index}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        onViewableItemsChanged={({ viewableItems: [{ index }] }) =>
          setCurrentIndex(index!)
        }
      />
      <View className="flex-row justify-between items-center px-[30px]">
        <Button title={isLastSlide ? "Get Started" : "Next"} onPress={onNext} />
        <View className="flex-row justify-center items-center">
          {onboadingSlidesData.map((_, index) => (
            <Dot active={index === currentIndex} key={index} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
