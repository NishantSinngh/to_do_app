import { View, StyleSheet, FlatList, ViewToken, Text, Dimensions } from 'react-native';
import React, { useCallback, useRef } from 'react';
import ListItem from '../components/ListItem';
import { useSharedValue } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const TaskList = React.memo(() => {

    const tasks = useSelector((state: any) => state.task.tasks)
    const viewableItems = useSharedValue<ViewToken[]>([]);

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
                data={tasks}
                ListFooterComponent={<View style={{ height: 80, }} />}
                ListEmptyComponent={() =>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: width }}>
                        <Text style={{ fontSize: 24, color: '#fff' }}>No Tasks Available</Text>
                    </View>
                }
                keyExtractor={item => item.id.toString()}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={({ item, index }) => (
                    <ListItem
                        item={item}
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
