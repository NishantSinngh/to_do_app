import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

interface Task {
    task: any;
    id: string;
    isCompleted: boolean;
}

const taskInitialState: { tasks: Task[] } = { 
  tasks: [] 
};

const task = createSlice({
    name: "task",
    initialState: taskInitialState,
    reducers: {
        taskList(state, action) {
            state.tasks = action.payload;
        },
        addTask(state, action) {
            state.tasks = [
                ...state.tasks, 
                { task: action.payload, id: Math.random().toString(), isCompleted: false }
            ];
            AsyncStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            AsyncStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTask(state, action) {
            state.tasks = state.tasks.map((task: Task) =>
                task.id === action.payload.id 
                ? { ...task, task: action.payload.editedText } 
                : task
            );
            AsyncStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTaskStatus(state, action) {
            state.tasks = state.tasks.map((task: Task) =>
                task.id === action.payload.id
                    ? { ...task, isCompleted: action.payload.isCompleted }
                    : task
            );
            AsyncStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    }
});

export default task.reducer;
export const { addTask, deleteTask, updateTask, updateTaskStatus, taskList } = task.actions;
