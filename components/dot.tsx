import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { primaryColor } from '@/constants/Colors'

export default function Dot() {
    const [dotActive, setdotActive]  = useState(true)
  return (
    <View>
      {
        dotActive? (<View style={{width: 35, height: 7, backgroundColor: "#4ba26a"}}></View>):(<View style={{width: 35, height: 7, backgroundColor: primaryColor}}></View>)
      }
    </View>
  )
}

const styles = StyleSheet.create({})