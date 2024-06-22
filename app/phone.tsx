import React, { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView, Platform, StyleSheet, StatusBar, View} from "react-native";
import Button from "@/components/button";
import Text from "@/components/text";
import { primaryColor } from "@/constants/Colors";
import TextInputWithLabel from "@/components/TextInput";
import { router } from "expo-router";

const isAndroid = Platform.OS === "android";

export default function Login() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
  headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text weight="700" style={[
            styles.title,
            { color:  primaryColor },
          ]}>Enter Your Phone number</Text>
        <TextInputWithLabel label="Your phone number"/>
        
      </View>
      <View>
        <Button title="Next" onPress={() => {  router.replace("verify");}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isAndroid ? StatusBar.currentHeight : 0,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  content: {
    marginTop:60,
    flex: 1,
    flexDirection:'column'
  },
  title:{
    fontSize:26,
    marginBottom:30
}
});

