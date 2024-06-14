import {  Text, TouchableOpacity, View } from 'react-native'
import { primaryColor } from "@/constants/Colors";
import React from 'react'

type StandardButtonProps = {
    title: string;
  };

export default function StandardButton({title}: StandardButtonProps) {
  return (
    <View>
      <TouchableOpacity style={{backgroundColor:primaryColor,flexDirection:"row",justifyContent:"center",alignItems:"center",borderRadius:50, paddingVertical:15}}>
        <Text style={{color:"white"}}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}