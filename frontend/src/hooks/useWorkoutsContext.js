import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext=()=>{
  const context=useContext(WorkoutsContext)

  if(!context){
    throw Error('use workoutContext must be used inside an workoutContextProvider')
  }
  return context
}