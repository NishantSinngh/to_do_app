import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  BackHandler,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import colors from '../constants/colors';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import actions from '../redux/actions';
import imagePath from '../assets/imagePath';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const InputModal = React.memo(({
  isVisible,
  onCancel,
}: {
  isVisible: boolean;
  onCancel: () => void;
}) => {

  const [text, setText] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  function HandleTextEnter(text: string) {
    const formattedText = text.trim()
    setText(formattedText)
  }

  function AddTaskHandler() {
    const isError = Boolean(text === '')
    if (isError) {
      setError(true)
      return
    }
    actions.AddTask(text)
    setText('')
    onCancel()
  }

  // const opacity = useSharedValue(0);
  // const modalTranslateY = useSharedValue(530);
  // useEffect(() => {
  //   if (isVisible) {
  //     modalTranslateY.value = withTiming(0, { duration: 400 })
  //     opacity.value = withTiming(1, { duration: 100 });
  //   }
  // }, [isVisible]);

  // function ClosingModal() {
  //   modalTranslateY.value = withTiming(530, { duration: 300 })
  //   opacity.value = withTiming(0, { duration: 300 });
  //   setTimeout(() => {
  //     onCancel();
  //   }, 150);
  // }
  useEffect(() => {
    const onBackPress = () => {
      if (isVisible) {
        onCancel()
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [isVisible, onCancel]);

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateY: modalTranslateY.value }],
  //   opacity: opacity.value,
  // }));
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  return (
    <React.Fragment>
      <AnimatedPressable
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
        onPress={onCancel}
        style={[{ ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },]}
      />
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={[styles.appContainer]}
      >
        <View style={styles.rectangle} />
        <Text style={styles.headerText}>Enter New Task</Text>
        <View
          style={{ flexDirection: 'row' }}
        >
          <View style={styles.textInputContainer}>
            <TextInput
              ref={inputRef}
              multiline
              placeholder="Enter task here..."
              onChangeText={HandleTextEnter}
              placeholderTextColor={colors.darkBluish}
              style={styles.inputStyle}
            />
          </View>
          <View style={styles.addButtonContainer}>
            <Pressable
              android_ripple={{ color: colors.ripple }}
              onPress={AddTaskHandler}
              style={styles.addButton}>
              <Image source={imagePath.send} style={styles.sendIcon} />
            </Pressable>
          </View>
        </View>
        {error && <Text style={styles.errorText}>Please check your entered text</Text>}
      </Animated.View>
    </React.Fragment>
  );
});

export default InputModal;

const styles = StyleSheet.create({
  appContainer: {
    position: 'absolute',
    top: "40%",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.darkBluish,
    zIndex: 10,
  },
  headerText: {
    color: colors.white,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 40,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.blue,
    marginHorizontal: 10,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 6,
  },
  inputStyle: {
    flex: 1,
    minHeight: 60,
    maxHeight: 100,
    marginLeft: 20,
    color: colors.darkBluish,
    fontSize: 15,
  },
  addButtonContainer: {
    backgroundColor: colors.darkBluish,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 4,
    flex: 0.2,
    marginRight: 5,
  },
  addButton: {
    padding: 17,
  },
  errorText: {
    color: colors.red,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 20,
  },
  rectangle: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 5,
    maxHeight: 5,
    minWidth: 50,
    maxWidth: 50,
    backgroundColor: colors.opacity,
    marginTop: 10,
    borderRadius: 20,
    elevation: 2,
  },
  sendIcon: {
    height: 26,
    width: 28,
  }
});
