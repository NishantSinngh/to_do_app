import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ListItem from '../components/ListItem'

const DATA = [
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

    const [isChecked, setIsChecked] = useState<{ id: number; task: string }[]>([])
    function handleCompleteCheck(item: { id: number, task: string }) {
        if (isChecked.find(completedItem => completedItem.id === item.id)) {
            setIsChecked(prev => prev.filter(_ => _.id !== item.id))
        } else {
            setIsChecked(prev => [...prev, { ...item }])
        }
    }
    console.log(isChecked);

    return (
        <View style={styles.listContainer}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                data={DATA}
                renderItem={({ item, index }) =>
                    <ListItem
                        item={item}
                        index={index}
                        completed={isChecked}
                        setCompleted={handleCompleteCheck}
                    />}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
})

export default TaskList