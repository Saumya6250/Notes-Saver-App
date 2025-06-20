import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
const initialState =
{
  pastes:localStorage.getItem("pastes")?JSON.parse(localStorage.getItem("pastes")):[]   //Loads existing pastes from localStorage if available. Else, starts with an empty array.
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {

    addToPaste: (state,action) => {
      const paste=action.payload;  // extract the data ( addToPaste (paste)) sent with dispatch in home 
      state.pastes.push(paste);     //added paste to Redux state
      localStorage.setItem("pastes", JSON.stringify(state.pastes));  //added paste to local storage
      toast.success("Paste Created Successfully");
    },


    updateToPaste: (state,action) => {
      const paste=action.payload;
      const index=state.pastes.findIndex((item)=>item._id===paste._id) //check paste jise update karna hai wo state me kaha exist hai uska index nikala
      
      if(index>=0)  //valid index
      {
        state.pastes[index]=paste   //updated the paste in that index
        localStorage.setItem("pastes", JSON.stringify(state.pastes));   //added updated paste to local storage
        toast.success("Paste Updated ");
      }
    },



    resetAllPastes: (state, action) => {
      //const paste=action.payload();
      state.pastes=[];                 //emptied state
      localStorage.removeItem("pastes"); //emptied local sto by removing "pastes" key
      
    },


    deleteFromPastes:(state,action)=>{
      const pasteId=action.payload;
      const index=state.pastes.findIndex((item)=>item._id===pasteId) //check paste jise update karna hai wo state me kaha exist hai uska index nikala

       if(index>=0) //valid index
      {
        state.pastes.splice(index,1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        
      toast.success("Paste Deleted ");
      }
    },
  },
})

export const { addToPaste,updateToPaste ,resetAllPastes ,deleteFromPastes} = pasteSlice.actions

export default pasteSlice.reducer