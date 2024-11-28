import React, { useContext } from 'react'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import useContextStore from './useContextStore'

function useSpaceWork() {
  const { inputs, setInputs, historyReports, setHistoryReports, currentUser, setCurrentUser } = useContext(ContextStore)
  const createSpaceWork = async ({ adminId, spaceWorkName, }) => {

    try {
      const newSpaceWork = await axios.post("http://localhost:3001/spaceWork/createSpaceWork", {
        adminId,
        spaceWorkName
      })
      console.log(newSpaceWork);
      notify("SUCCESS", "הסביבה נוצרה בהצלחה")

    } catch (error) {
      console.log(error);
      notify("ERROR", "בעיה ביצירת הסביבה")

    }
  }
  const createSubSpaceWork = async ({ adminId, spaceWorkName, subSpaceWorkName }) => {
    try {
      const newSubSp = await axios.post("http://localhost:3001/spaceWork/createSubSpaceWork", {
        adminId,
        spaceWorkName,
        subSpaceWorkName
      })
      // update the new sub spaceWork in current User localy to show it 
      const UpdateUser = { ...currentUser }
      UpdateUser.subSpaceWorks[spaceWorkName] = { ...UpdateUser.subSpaceWorks[spaceWorkName], [subSpaceWorkName]: "admin" }
      // set the new subSpaceWork in current User and in singleOption
      setCurrentUser(UpdateUser)
      notify("SUCCESS", "התת-סביבה נוצרה בהצלחה")
    } catch (error) {
      notify("ERROR", "בעיה ביצירת התת-סביבה")

      console.log(error);
    }
  }
  const createRoom = async ({ spaceWorkName, subSpaceWorkName, adminId, roomName }) => {
    console.log(adminId);

    try {
      const newRoom = await axios.post(`http://localhost:3001/spaceWork/createRoom`, {
        spaceWorkName,
        subSpaceWorkName,
        adminId,
        roomName
      })

      // // update the new room in current User localy to show it 
      const key = `${spaceWorkName}_${subSpaceWorkName}_${roomName}`
      const rooms = { ...currentUser.rooms, [key]: "editor" }
      const UpdateUser = { ...currentUser, rooms }
      // //saved it
      setCurrentUser(UpdateUser)
      notify("SUCCESS", "החדר נוצר בהצלחה")
    } catch (error) {

      notify("ERROR", "בעיה ביצירת חדר")

      console.log(error);
    }
  }





  const deleteSpaceWork = async ({ adminId, spaceWorkName, }) => {
    console.log(adminId, spaceWorkName);

    try {
      const newSpaceWork = await axios.delete("http://localhost:3001/spaceWork/deleteSW", {
        adminId,
        spaceWorkName
      })
      console.log(newSpaceWork);
      alert("הסביבה נמחקה בהצלחה")

    } catch (error) {
      console.log(error);
    }
  }
  const deleteSubSpaceWork = async ({ adminId, spaceWorkName, subSpaceWorkName }) => {
    try {
      const newSubSp = await axios.post("http://localhost:3001/spaceWork/deleteSubSW", {
        adminId,
        spaceWorkName,
        subSpaceWorkName
      })
      // update the delete sub spaceWork from current User localy to show it 
      const updateUser = { ...currentUser }
      delete updateUser?.subSpaceWorks[spaceWorkName][subSpaceWorkName];
      console.log(updateUser?.subSpaceWorks[spaceWorkName]);
      // // saved it
      // setSingleOption(Object.keys(updateUser?.subSpaceWorks[spaceWorkName]))
      setCurrentUser(updateUser)
      console.log(newSubSp);
      notify("SUCCESS", "התת-סביבה נמחקה בהצלחה")

    } catch (error) {
      notify("ERROR", "בעיה במחיקת התת-סביבה")

      console.log(error);
    }
  }

  const deleteRoom = async ({ spaceWorkName, subSpaceWorkName, adminId, roomName }) => {
    console.log(spaceWorkName, subSpaceWorkName, adminId, roomName);

    try {
      const newRoom = await axios.post(`http://localhost:3001/spaceWork/deleteSWRoom`, {
        spaceWorkName,
        subSpaceWorkName,
        adminId,
        roomName
      })
      const key = `${spaceWorkName}_${subSpaceWorkName}_${roomName}`
      // // update the new room in current User localy to show it 
      const updateUser = { ...currentUser }
      delete updateUser?.rooms[key]
      // //saved it
      setCurrentUser(updateUser)
      // console.log(user?.data?.user);
      console.log(newRoom);
      notify("SUCCESS", "החדר נמחק בהצלחה")


    } catch (error) {
      notify("ERROR", "בעיה במחיקת החדר")

    }
  }


  const editSpaceWork = async ({ adminId, spaceWorkName, }) => {
    console.log(adminId, spaceWorkName);

    try {
      const newSpaceWork = await axios.put("http://localhost:3001/spaceWork/deleteSW", {
        adminId,
        spaceWorkName
      })
      console.log(newSpaceWork);
      alert("הסביבה נמחקה בהצלחה")

    } catch (error) {
      console.log(error);
    }
  }
  const editSubSpaceWork = async ({ adminId, oldSubSpaceWorkName, newSubSpaceWorkName, spaceWorkName }) => {
    console.log(adminId, oldSubSpaceWorkName, newSubSpaceWorkName, spaceWorkName);

    try {
      const newSubSp = await axios.put("http://localhost:3001/spaceWork/editSubSpaceWork", {
        spaceWorkName,
        adminId,
        oldSubSpaceWorkName,
        newSubSpaceWorkName
      })
      console.log(newSubSp);
      // // update the sub spaceWork in current User localy to show it 
      const updateUser = { ...currentUser }
      updateUser.subSpaceWorks[spaceWorkName][newSubSpaceWorkName] = updateUser?.subSpaceWorks[spaceWorkName][oldSubSpaceWorkName];
      delete updateUser?.subSpaceWorks[spaceWorkName][oldSubSpaceWorkName];
      //saved it
      setCurrentUser(updateUser)
      notify("SUCCESS", "התת-סביבה עודכנה בהצלחה")

    } catch (error) {

      notify("ERROR", "בעיה בעדכון התת-סביבה")

      console.log(error);
    }
  }

  const editRoom = async ({ adminId, spaceWorkName, subSpaceWorkName, oldRoomName, newRoomName }) => {
    console.log(adminId, spaceWorkName, subSpaceWorkName, oldRoomName, newRoomName);

    try {
      const newRoom = await axios.put(`http://localhost:3001/spaceWork/editRoom`, {
        adminId, spaceWorkName, subSpaceWorkName, oldRoomName, newRoomName

      })

      // // update the room  in current User localy to show it 
      const newKey = `${spaceWorkName}_${subSpaceWorkName}_${newRoomName}`
      const oldKey = `${spaceWorkName}_${subSpaceWorkName}_${oldRoomName}`

      const updateUser = { ...currentUser }
      updateUser.rooms[newKey] = updateUser?.rooms[oldKey];
      delete updateUser?.rooms[oldKey];
      // //saved it
      // setSingleOption(Object.keys(updateUser?.subSpaceWorks[spaceWorkName]))
      setCurrentUser(updateUser)
      // console.log(newRoom);
      notify("SUCCESS", "החדר עודכן בהצלחה")

    } catch (error) {
      console.log(error);
      notify("ERROR", "בעיה בעדכון החדר")


    }
  }
  const getRoomInputs = async ({ spaceWork, subSpaceWork, room, userId }) => {
    console.log(spaceWork, subSpaceWork, room, userId);

    try {
      const result = await axios.get(`http://localhost:3001/spaceWork/getRoom`, {
        params: { userId, spaceWork, subSpaceWork, room }
      })
      console.log(result.data);

      setInputs(result?.data)
    } catch (error) {
      console.log(error);
    }
  }
  const getRoomHistory = async ({ spaceWork, subSpaceWork, room, userId }) => {
    console.log(spaceWork, subSpaceWork, room, userId);

    try {
      const result = await axios.get(`http://localhost:3001/spaceWork/getRoomHistory`, {
        params: { userId, spaceWork, subSpaceWork, room }
      })
      console.log(result.data);

    } catch (error) {
      console.log(error);
    }
  }


  return { createSpaceWork, getRoomHistory, getRoomInputs, deleteRoom, editRoom, createSubSpaceWork, createRoom, deleteSubSpaceWork, inputs, editSubSpaceWork }
}

export default useSpaceWork