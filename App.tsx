import { StatusBar, View, } from 'react-native'
import React, { useEffect } from 'react'
import { MainScreen } from './src'
import BootSplash from "react-native-bootsplash"


const App = () => {

  useEffect(()=>{
    BootSplash.hide({fade:true})
  },[])

  return (
    <View style={{ flex: 1 }}>
      <MainScreen />
      <StatusBar barStyle={'light-content'} translucent backgroundColor={"transparent"} />
    </View>
  )
}

export default App