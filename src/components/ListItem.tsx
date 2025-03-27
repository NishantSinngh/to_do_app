import { View, Text, StyleSheet, Dimensions, Pressable, ViewToken } from 'react-native';
import React, { useEffect } from 'react';
import colors from '../constants/colors';
import imagePath from '../assets/imagePath';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  SharedValue
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ListItemProps {
  item: { id: number; task: string };
  index: number;
  completed: Set<number>;
  setCompleted: (item: { id: number; task: string }) => void;
  viewableItems: SharedValue<ViewToken[]>;
}

const ListItem = React.memo(({
  item,
  index,
  completed,
  setCompleted,
  viewableItems
}: ListItemProps) => {
  const isCompleted = completed.has(item.id);
  const scaleAnim = useSharedValue(0.1);
  const viewTranslate = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value.find(viewableItem => viewableItem.item.id === item.id && viewableItem.isViewable)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0.4),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.8) }]
    };
  }, []);

  useEffect(() => {
    if (isCompleted) {
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
  }, [isCompleted, scaleAnim, viewTranslate]);

  return (
    <Reanimated.View style={[styles.container, { transform: [{ translateX: viewTranslate }] }, rStyle]}>
      <Pressable
        android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
        style={styles.button}
        onPress={() => setTimeout(() => setCompleted(item), 150)}
      >
        {!isCompleted ? (
          <View style={styles.checkBox} />
        ) : (
          <Reanimated.Image
            source={imagePath.checkBox}
            style={[styles.checkBoxImage, { transform: [{ scale: scaleAnim }] }]}
          />
        )}
        <Text style={[styles.textStyle, isCompleted && styles.completedTextStyle]}>
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
