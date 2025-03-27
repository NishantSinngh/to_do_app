import { addTask, deleteTask, updateTask } from '../reducers/task'
import store from '../store'



const { dispatch } = store


export function Log(){
    console.log("sdsdsds");
}

// export function changeIntroScreenStatus(data: boolean) {
//     dispatch(saveIntroScreenStatus(data));
//   }
  
//   export function userDataSave(data: object | string | null) {
//     dispatch(saveUserData(data));
//   }
  
//   export function onSaveRememberedData(data: object | string | null) {
//     dispatch(saveRememberedData(data));
//   }
  
//   export function onSaveSplashStatus(data: boolean) {
//     dispatch(saveSplashStatus(data));
//   }