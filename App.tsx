import { StatusBar, View, } from 'react-native'
import React, { useEffect } from 'react'
import { MainScreen } from './src'
import BootSplash from "react-native-bootsplash"
import InoputModal from './src/components/InputModal'
import { Provider } from 'react-redux'
import store from './src/redux/store'


const App = () => {

  useEffect(() => {
    BootSplash.hide({ fade: true })
  }, [])

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <MainScreen />
        {/* <InoputModal/> */}
        <StatusBar barStyle={'light-content'} translucent backgroundColor={"transparent"} />
      </View>
    </Provider>
  )
}

export default App