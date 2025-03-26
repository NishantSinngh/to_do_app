import { StatusBar, View, } from 'react-native'
import React from 'react'
import { MainScreen } from './src'
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <MainScreen />
      <StatusBar barStyle={'light-content'} translucent backgroundColor={"transparent"} />
    </View>
  )
}

export default App