import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../constants/colors';
import imagePath from '../assets/imagePath';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import actions from '../redux/actions';

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

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  useEffect(() => {
    if (isVisible) {
      scale.value = withTiming(1)
      opacity.value = withTiming(1, { duration: 10 });
    }
  }, [isVisible]);
  useEffect(() => {
    const onBackPress = () => {
      if (isVisible) {
        onCancel();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [isVisible, onCancel]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));




  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Animated.View style={[styles.appContainer, animatedStyle]}>
        <Pressable onPress={onCancel} style={styles.crossImageContainer}>
          <Image source={imagePath.cross} />
        </Pressable>
        <Text style={styles.headerText}>Enter New Task</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            multiline
            placeholder="Enter task here..."
            onChangeText={HandleTextEnter}
            placeholderTextColor={colors.darkBluish}
            style={styles.inputStyle}
          />
        </View>
        {error && <Text style={styles.errorText}>Please check your entered text</Text>}
        <View style={styles.addButtonContainer}>
          <Pressable
            android_ripple={{ color: colors.ripple }}
            onPress={AddTaskHandler}
            style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

export default InputModal;

const styles = StyleSheet.create({
  appContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.darkBluish,
    zIndex: 10,
  },
  headerText: {
    color: colors.white,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 150,
    marginBottom: 50,
  },
  textInputContainer: {
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
    maxHeight: 120,
    marginLeft: 20,
    color: colors.darkBluish,
    fontSize: 15,
  },
  crossImageContainer: {
    alignSelf: 'flex-end',
    overflow: 'hidden',
    margin: 10,
  },
  addButtonContainer: {
    backgroundColor: colors.blue,
    marginTop: 160,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 4,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 153,
    height: 63,
  },
  addButtonText: {
    fontSize: 16,
    color: colors.white,
  },
  errorText: {
    color: colors.red,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 20,
  },
});
