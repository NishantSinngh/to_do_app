import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit"



interface Task {
    task: any;
    id: string;
}

const taskInitialState: { tasks: Task[] } = { tasks: [{ id: 'test', task: 'sdjhdshhj' }] }


const task = createSlice({
    name: "task",
    initialState: taskInitialState,
    reducers: {
        taskList(state, action) {
            state.tasks = action.payload
        },
        addTask(state, action) {
            state.tasks = [...state.tasks, { task: action.payload, id: Math.random().toString() }]
            AsyncStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },
        updateTask(state, action) {
            state.tasks = state.tasks.map((task: Task) => task.id === action.payload.id ? { ...task, task: action.payload.editedText } : task)
        }
    }
})


export default task.reducer
export const { addTask, deleteTask, updateTask,taskList } = task.actions