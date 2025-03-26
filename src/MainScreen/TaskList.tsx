import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ListItem from '../components/ListItem'

const TaskList = React.memo(() => {
    
    return (
        <View style={styles.listContainer}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                data={[
                    { key: 'Task 1' },
                    { key: 'Task 2' },
                    { key: 'Task 3' },
                    { key: 'Task 4' },
                    { key: 'Task 5' },
                    { key: 'Task 6' },
                    { key: 'Task 7' },
                    { key: 'Task 8' },
                    { key: 'Task 9' },
                    { key: 'Task 50' },
                    { key: 'Task 12' },
                    { key: 'Task 2f' },
                    { key: 'Task 36' },
                    { key: 'Task 45' },
                    { key: 'Task 5f' },
                    { key: 'Task 16' },
                    { key: 'Task 2j' },
                    { key: 'Task 3l' },
                    { key: 'Task 4q' },
                    { key: 'Task 54' },
                ]}
                renderItem={({ item }) => <ListItem item={item.key} />}
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