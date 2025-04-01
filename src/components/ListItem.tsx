import { View, Text, StyleSheet, Dimensions, Pressable, ViewToken, BackHandler, Vibration, TextInput } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import colors from '../constants/colors';
import imagePath from '../assets/imagePath';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import actions from '../redux/actions';

const { width } = Dimensions.get('window');

const ListItem = React.memo(({
  item,
  viewableItems
}: ListItemProps) => {

  // console.log(item);
  const textRef = useRef(item.task);
  const textInputRef = useRef(null);
  const [error, setError] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  function HandleTextEnter(text: string) {
    textRef.current = text;
    console.log(textRef.current);

  }

  function UpdateTaskHandler() {
    const trimmedText = textRef.current.trim();
    if (!trimmedText) {
      setError(true);
      return;
    }
    if (trimmedText === item.task) {
      setIsEditing(false);
      setIconsVisible(false);
      setError(false)
      return;
    }

    actions.UpdateTask(item.id, trimmedText).finally(() => {
      setIsEditing(false);
      setIconsVisible(false);
      setError(false)
    });

    textRef.current = "";
  }

  const [iconsVisible, setIconsVisible] = useState(false)

  const handleCompleteCheck = useCallback((id: string, status: boolean) => {
    actions.UpdateTaskStatus(id, status);
  }, []);

  const handleIconVisibility = useCallback(() => {
    if (!iconsVisible) Vibration.vibrate(60)
    setIconsVisible((prev) => !prev);
  }, [iconsVisible]);

  function DeleteTaskHandler() {
    actions.DeleteTask(item.id)
    handleIconVisibility()
  }

  useEffect(() => {
    const onBackPress = () => {
      if (iconsVisible) {
        handleIconVisibility();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [iconsVisible, handleIconVisibility]);

  const rotation = useSharedValue(-5);
  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });


  useEffect(() => {
    if (iconsVisible) {
      rotation.value = withRepeat(
        withTiming(5, {
          duration: 100,
          easing: Easing.linear,
        }),
        -1,
        true
      );
    } else {
      rotation.value = withTiming(0, { duration: 100 });
    }
  }, [iconsVisible, rotation]);

  const scaleAnim = useSharedValue(0.1);
  const viewTranslate = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value.find((viewableItem: ViewToken) => viewableItem.item.id === item.id && viewableItem.isViewable)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0.4),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.8) }]
    };
  }, []);

  useEffect(() => {
    if (item.isCompleted) {
      Vibration.vibrate(40)
      scaleAnim.value = withSpring(1);
      viewTranslate.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    } else {
      scaleAnim.value = 0;
      viewTranslate.value = 0;
    }
  }, [item.isCompleted, scaleAnim, viewTranslate]);



  return (
    <>
      <Reanimated.View style={[styles.container, { transform: [{ translateX: viewTranslate }] }, rStyle]}>
        <Pressable
          android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
          style={styles.button}
          onPress={() => setTimeout(() => handleCompleteCheck(item.id, !item.isCompleted), 100)}
          onLongPress={handleIconVisibility}
        >
          {!item.isCompleted ? (
            <View style={styles.checkBox} />
          ) : (
            <Reanimated.Image
              source={imagePath.checkBox}
              style={[styles.checkBoxImage, { transform: [{ scale: scaleAnim }] }]}
            />
          )}

          {!isEditing ? <Text style={[styles.textStyle, item.isCompleted && styles.completedTextStyle]}>
            {item.task}
          </Text>
            :
            <TextInput
              ref={textInputRef}
              style={styles.textInputStyle}
              defaultValue={item.task}
              onChangeText={HandleTextEnter}
              onSubmitEditing={UpdateTaskHandler}
              autoFocus={true}
            // multiline
            />}
        </Pressable>
      </Reanimated.View>
      {error && <Text style={styles.errorText}>Please check your entered text</Text>}
      {iconsVisible && <View style={styles.iconContainer}>
        <Pressable onPress={() => setIsEditing(true)}>
          <Reanimated.Image source={imagePath.edit} style={[styles.icons, iconStyle]} />
        </Pressable>
        <Pressable onPress={DeleteTaskHandler}>
          <Reanimated.Image source={imagePath.delete} style={[styles.icons, iconStyle]} />
        </Pressable>
      </View >}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8,
    width: width - 30,
    marginHorizontal: 20,
    borderRadius: 5,
    overflow: 'hidden',
    zIndex: 1,
    elevation: 6,
  },
  textStyle: {
    color: colors.white,
    marginRight: 40,
  },
  textInputStyle: {
    flex: 1,
    color: colors.white,
    zIndex: 4,
    backgroundColor: colors.ripple,
    borderRadius: 10,
  },
  completedTextStyle: {
    textDecorationLine: 'line-through',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.darkBluish,
    padding: 15,
  },
  checkBoxImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  checkBox: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.blue,
  },
  iconContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icons: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
    marginBottom: 8,
  },
  errorText: {
    color: colors.red,
    alignSelf: 'center',
    marginBottom: 5,
  },
});

export default ListItem;
