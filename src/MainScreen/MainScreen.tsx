import { View, Text, ImageBackground, Pressable, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import mainScreenStyle from './mainScreen.style';
import imagePath from '../assets/imagePath';
import TaskList from './TaskList';
import colors from '../constants/colors';
import InputModal from '../components/InputModal';

const MainScreen = ({ taskLoading }: { taskLoading: boolean }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function handleModal() {
    if (isVisible) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }

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

      {isVisible && <View style={mainScreenStyle.overlay} />}

      {isVisible && <InputModal isVisible={isVisible} onCancel={handleModal} />}
    </>
  );
};

export default MainScreen;

