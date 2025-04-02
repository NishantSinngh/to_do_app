import { View, Text, ImageBackground, Pressable, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import mainScreenStyle from './mainScreen.style';
import imagePath from '../assets/imagePath';
import TaskList from './TaskList';
import colors from '../constants/colors';
import InputModal from '../components/InputModal';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const MainScreen = ({ taskLoading }: { taskLoading: boolean }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function handleModal() {
    if (isVisible) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }
  const backgroundColor = useSharedValue(colors.opacity0);
  useEffect(() => {
    if (isVisible) {
      backgroundColor.value = withTiming(colors.overlay, { duration: 500 })
    } else {
      backgroundColor.value = withTiming(colors.opacity0, { duration: 1000 })
    }
  }, [isVisible]);
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value
  }));

  return (
    <>
      <View style={mainScreenStyle.appContainer}>
        <ImageBackground
          source={imagePath.appBackground}
          resizeMode="stretch"
          style={mainScreenStyle.background}
        />
        <View style={mainScreenStyle.container}>
          <View style={mainScreenStyle.headerContainer}>
            <Text style={mainScreenStyle.text}>Tasks</Text>
          </View>
          <View style={{ flex: 1 }}>
            {taskLoading ? <ActivityIndicator size={60} color={colors.blue} style={mainScreenStyle.loader} /> : <TaskList />}
          </View>
          <View style={mainScreenStyle.footer}>
            <Pressable
              onPress={handleModal}
              android_ripple={{ color: colors.ripple }}
            >
              <Image source={imagePath.add} style={mainScreenStyle.addImage} />
            </Pressable>
          </View>
        </View>
      </View>

      {isVisible && <Animated.View style={[mainScreenStyle.overlay, animatedStyle]} />}

      {isVisible && <InputModal isVisible={isVisible} onCancel={handleModal} />}
    </>
  );
};

export default MainScreen;

