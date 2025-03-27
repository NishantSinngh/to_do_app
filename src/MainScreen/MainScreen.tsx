import { View, Text, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import mainScreenStyle from './mainScreen.style';
import imagePath from '../assets/imagePath';
import TaskList from './TaskList';

const MainScreen = () => {
  return (
    <View style={{ flex: 1, }}>
      <ImageBackground
        source={imagePath.appBackground}
        resizeMode='stretch'
        style={mainScreenStyle.background}
      />
      <View style={mainScreenStyle.container}>
        <View style={mainScreenStyle.headerContainer}>
          <Text style={mainScreenStyle.text}>Tasks</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TaskList />
        </View>
        <View style={mainScreenStyle.footer}>
          <Pressable>
            <Text>ADD</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;
