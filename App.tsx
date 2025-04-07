import { StatusBar, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MainScreen } from './src';
import BootSplash from "react-native-bootsplash";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskList } from './src/redux/reducers/task';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {

  const { dispatch } = store
  const [tasksLoading, setTaskLoading] = useState<boolean>(true)
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
    } finally {
      setTaskLoading(false)
    }
  }




  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MainScreen taskLoading={tasksLoading} />
          <StatusBar barStyle={'light-content'} translucent backgroundColor={"transparent"} />
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
