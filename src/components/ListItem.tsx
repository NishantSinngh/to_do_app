import { View, Text, StyleSheet, Dimensions, Pressable, ViewToken } from 'react-native';
import React, { useCallback, useEffect } from 'react';
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

  const handleCompleteCheck = useCallback((id: string, status: boolean) => {
    actions.UpdateTaskStatus(id, status);
}, []);

  const scaleAnim = useSharedValue(0.1);
  const viewTranslate = useSharedValue(0);
  console.log(item);

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
    <Reanimated.View style={[styles.container, { transform: [{ translateX: viewTranslate }] }, rStyle]}>
      <Pressable
        android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
        style={styles.button}
        onPress={() => setTimeout(() => handleCompleteCheck(item.id, !item.isCompleted), 100)
        }
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
});

export default ListItem;
