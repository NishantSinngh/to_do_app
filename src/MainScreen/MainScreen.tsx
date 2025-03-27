import { View, Text, ImageBackground, Pressable, Image } from 'react-native';
import React from 'react';
import mainScreenStyle from './mainScreen.style';
import imagePath from '../assets/imagePath';
import TaskList from './TaskList';
import colors from '../constants/colors';

const MainScreen = () => {
  return (
    <View style={mainScreenStyle.appContainer}>
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
          <Pressable
            android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
          >
            <Image source={imagePath.add} style={mainScreenStyle.addImage} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;
