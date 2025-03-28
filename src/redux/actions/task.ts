import { addTask, deleteTask, updateTask } from '../reducers/task'
import store from '../store'



const { dispatch } = store


export function AddTask(editedText: string){
    dispatch(addTask(editedText))
}
export function DeleteTask(id: string){
    dispatch(deleteTask(id))
}