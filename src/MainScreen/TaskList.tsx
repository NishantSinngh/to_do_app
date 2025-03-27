import { View, StyleSheet, FlatList, ViewToken } from 'react-native';
import React, { useState, useCallback, useRef } from 'react';
import ListItem from '../components/ListItem';
import { useSharedValue } from 'react-native-reanimated';

interface Task {
  id: number;
  task: string;
}

const DATA: Task[] = [
  { id: 1, task: 'Task 1' },
  { id: 2, task: 'Task 2' },
  { id: 3, task: 'Task 3' },
  { id: 4, task: 'Task 4' },
  { id: 5, task: 'Task 5' },
  { id: 6, task: 'Task 6' },
  { id: 7, task: 'Task 7' },
  { id: 8, task: 'Task 8' },
  { id: 9, task: 'Task 9' },
  { id: 10, task: 'Task 50' },
  { id: 11, task: 'Task 12' },
  { id: 12, task: 'Task 2f' },
  { id: 13, task: 'Task 36' },
  { id: 14, task: 'Task 45' },
  { id: 15, task: 'Task 5f' },
  { id: 16, task: 'Task 16' },
  { id: 17, task: 'Task 2j' },
  { id: 18, task: 'Task 3l' },
  { id: 19, task: 'Task 4q' },
  { id: 20, task: 'Task 54' },
];

const TaskList = React.memo(() => {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const handleCompleteCheck = useCallback((item: Task) => {
    setCompleted(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item.id)) {
        newSet.delete(item.id);
      } else {
        newSet.add(item.id);
      }
      return newSet;
    });
  }, []);

  const throttledRef = useRef<NodeJS.Timeout | null>(null);
  const onViewableItemsChanged = useCallback(({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
    throttledRef.current = setTimeout(() => {
      viewableItems.value = vItems;
      throttledRef.current = null;
    }, 50);
  }, [viewableItems]);

  return (
    <View style={styles.listContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={DATA}
        keyExtractor={item => item.id.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            index={index}
            completed={completed}
            setCompleted={handleCompleteCheck}
            viewableItems={viewableItems}
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default TaskList;
