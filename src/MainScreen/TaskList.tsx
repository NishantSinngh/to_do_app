import { View, StyleSheet, FlatList, ViewToken, Text, Dimensions } from 'react-native';
import React, { useCallback, useRef } from 'react';
import ListItem from '../components/ListItem';
import { useSharedValue } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';

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
            <View style={{ paddingTop: 2, paddingBottom: 2, alignSelf: 'center' }} >
                <Text style={{ color: colors.white, fontSize: 10, }}>© 2025 Nishant Singh. All rights reserved.</Text>
            </View>
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
