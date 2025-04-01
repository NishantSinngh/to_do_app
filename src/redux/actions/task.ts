import { addTask, deleteTask, updateTask, updateTaskStatus } from '../reducers/task'
import store from '../store'



const { dispatch } = store


export async function AddTask(editedText: string) {
    dispatch(addTask(editedText))
}
export async function DeleteTask(id: string) {
    dispatch(deleteTask(id))
}
export async function UpdateTask(id: string,editedText:string) {
    dispatch(updateTask({id,editedText}))
}
export async function UpdateTaskStatus(id: string, isCompleted: boolean) {
    dispatch(updateTaskStatus({ id, isCompleted }));
}