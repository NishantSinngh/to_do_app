import { View, Text, StyleSheet, Dimensions, Pressable, ViewToken, Image, BackHandler,Vibration } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import colors from '../constants/colors';
import imagePath from '../assets/imagePath';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import actions from '../redux/actions';

const { width } = Dimensions.get('window');

const ListItem = React.memo(({
  item,
  viewableItems
}: ListItemProps) => {

  console.log(item);

  const [iconsVisible, setIconsVisible] = useState(false)

  const handleCompleteCheck = useCallback((id: string, status: boolean) => {
    actions.UpdateTaskStatus(id, status);
  }, []);
  function handleIconVisibility() {
    Vibration.vibrate(500)
    setIconsVisible(prev => !prev)
  }
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
          <Text style={[styles.textStyle, item.isCompleted && styles.completedTextStyle]}>
            {item.task}
          </Text>
        </Pressable>
      </Reanimated.View>
      {iconsVisible && <View style={styles.iconContainer}>
        <Pressable>
          <Image source={imagePath.edit} style={styles.icons} />
        </Pressable>
        <Pressable onPress={DeleteTaskHandler}>
          <Image source={imagePath.delete} style={styles.icons} />
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
});

export default ListItem;
