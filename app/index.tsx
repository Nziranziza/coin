import { router } from "expo-router";
import React, { useRef } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import Button from "@/components/button";
import Dot from "@/components/dot";
import Logo from "@/components/icons/logo";
import OnboardSlide from "@/components/onboard-slide";
import { primaryColor } from "@/constants/Colors";
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
      router.replace("(tabs)");
    }
  };

  const isLastSlide = currentIndex === onboadingSlidesData.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paddingX}>
        <Logo />
      </View>
      <FlatList
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        style={[styles.tabs, styles.paddingX]}
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
      <View style={[styles.tabsFooter, styles.paddingX]}>
        <Button title={isLastSlide ? "Get Started" : "Next"} onPress={onNext} />
        <View style={styles.dots}>
          {onboadingSlidesData.map((_, index) => (
            <Dot active={index === currentIndex} key={index} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    width: wp("100%"),
  },
  container: {
    flex: 1,
    paddingTop: isAndroid ? StatusBar.currentHeight : 0,
    paddingBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: primaryColor,
    opacity: 0.5,
    margin: 5,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paddingX: {
    paddingHorizontal: 30,
  },
});
