import { StyleSheet, Text as DefaultText, View, TextProps } from 'react-native'
import React from 'react'

type CustomProps = TextProps & {
    weight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
    }

const fontFamilies = {
    100: "InterThin",
    200: "InterExtraLight",
    300: "InterLight",
    400: "InterRegular",
    500: "InterMedium",
    600: "InterSemiBold",
    700: "InterBold",
    800: "InterExtraBold",
    900: "InterBlack",
}

export default function Text({ style,weight = "400", ...props }: CustomProps) {
  return (

      <DefaultText style={[{fontFamily:fontFamilies[weight]}, style]} {...props}/>

  )
}

const styles = StyleSheet.create({})