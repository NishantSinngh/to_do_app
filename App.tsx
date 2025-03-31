import { StatusBar, View, Alert, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { MainScreen } from './src';
import BootSplash from "react-native-bootsplash";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskList } from './src/redux/reducers/task';

const App = () => {
  const { dispatch } = store
  useEffect(() => {
    BootSplash.hide({ fade: true });
    getSavedTasks()
  }, []);

  async function getSavedTasks() {
    try {
      const savedTask = await AsyncStorage.getItem('tasks');
      if (savedTask) {
        const tasks = JSON.parse(savedTask);
        dispatch(taskList(tasks));
      }
    } catch (error) {
      console.error("Error retrieving saved tasks:", error);
    }
  }



  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <MainScreen />
        <StatusBar barStyle={'light-content'} translucent backgroundColor={"transparent"} />
      </View>
    </Provider>
  );
};

export default App;
