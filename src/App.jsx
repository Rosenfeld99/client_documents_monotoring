import React, { useContext, useRef, useState } from 'react'
import AppRoutes from './Routes/AppRoutes'
import "./App.css"
import { ContextStore, ContextStoreProvider } from './context/contextStore'
import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import useUsers from './hooks/useUsers'
import { io } from 'socket.io-client'
import useContextStore from './hooks/useContextStore'

const App = () => {
  const baseUrl = "http://localhost:3001"
  const [searchParams] = useSearchParams()
  const { currentUser } = useUsers()
  const { pathname } = useLocation()

  // const { setSocketIo, socketIo, setInputs, historyReports, setHistoryReports, setNewIdReport, columns, setColumns, setFilteredData } = useContextStore()
  const { setSocketIo, socketIo, setCurrentUser, setInputs, inputs, setCountRoomReports, historyReports, setHistoryReports, setNewIdReport, columns, setColumns, filteredData, setFilteredData } = useContext(ContextStore)
  const localSW = localStorage.getItem("sw");
  const localSubSP = localStorage.getItem("subSW");
  const localRoom = localStorage.getItem("room");
  console.log(inputs);


  useEffect(() => {
    if (socketIo) {
      socketIo.on("login", () => {
        // here the first login and check if user automaticly go to dashbord than join him to open dashbord in socket
        socketIo.emit("loginIn", {
          userId: currentUser?.userId,
          username: currentUser?.firstName + " " + currentUser?.lastName,
          spaceWork: localSW,
          subSpaceWork: localSubSP,
          room: localRoom,
          page: localSW && localSubSP && localRoom ? "dashboard_open" : ""
        });
      });
      // create input socket
      socketIo.on("recive_new_inputs", (data) => {
        setInputs(data?.newInputsArray)
      });
      // create input socket
      socketIo.on("recive_create_room", ({ spaceWork, subSpaceWork, newRoomObj }) => {
        const key = `${spaceWork}_${subSpaceWork}_${newRoomObj?.name}`
        if (currentUser && currentUser.subSpaceWorks[spaceWork][subSpaceWork] === "admin") {
          setCurrentUser((prev) => {
            const rooms = { ...prev.rooms, [key]: "editor" }
            const UpdateUser = { ...prev, rooms }
            return UpdateUser
          })
        }
      });
      // create input socket
      socketIo.on("recive_delete_room", ({ spaceWork, subSpaceWork, newRoomObj }) => {
        const key = `${spaceWork}_${subSpaceWork}_${roomName}`
        // //saved it
        setCurrentUser((prev) => {
          delete prev?.rooms[key]
          return prev
        })
      });
      // create input socket
      socketIo.on("recive_update_room", ({ spaceWork, subSpaceWork, newRoomName }) => {
        const key = `${spaceWork}_${subSpaceWork}_${newRoomObj?.name}`
        if (currentUser && currentUser.subSpaceWorks[spaceWork][subSpaceWork] === "admin") {
          setCurrentUser((prev) => {
            const rooms = { ...prev.rooms, [key]: "editor" }
            const UpdateUser = { ...prev, rooms }
            return UpdateUser
          })
        }
      });

      // delete input socket
      socketIo.on("recive_delete_input", (data) => {
        setInputs(data?.inputsArray)
      });
      socketIo.on("recive_update_inputs", (data) => {
        setInputs(data?.inputsArray)
      });
      socketIo.on("recive_close_report", ({ hebrewReport }) => {
        const currentPage = window?.location?.pathname?.split("/")[1]
        console.log(hebrewReport);
        if (currentPage === "dashboard") {
          if (hebrewReport["יחידה מטפלת"] === searchParams.get('room')) {
            setCountRoomReports((prev) => ({ ...prev, roomResponseClose: [...prev.roomResponseClose, hebrewReport], roomResponseOpen: prev.roomResponseOpen.filter((report) => report._id !== hebrewReport._id) }))
          }
          else setCountRoomReports((prev) => ({ ...prev, otherResponseClose: [...prev.otherResponseClose, hebrewReport], otherResponseOpen: prev.otherResponseOpen.filter((report) => report._id !== hebrewReport._id) }))
        }

        if (currentPage === "issue-history") {
          setFilteredData((prev) => [...prev, hebrewReport])
        }
        else setFilteredData((prev) => prev?.filter((report) => report._id != hebrewReport?._id))
        console.log("close report");

        setHistoryReports((prev) => {
          for (let index = 0; index < prev?.data?.length; index++) {
            if (prev?.data.length > 0) {
              if (prev?.data[index]?._id == hebrewReport?._id) {
                prev.data[index].reportOpen = false
              }
            }
          }
          return prev
        }
        )
        // setHistoryReports((prev) => prev?.map((report) => report._id == finishReportId ? { ...report, reportOpen: false } : report))
      });
      socketIo.on("recive_delete_report", ({ deletedReport }) => {
        const currentPage = window?.location?.pathname?.split("/")[1]
        console.log(deletedReport);

        const unitResponse = deletedReport.inputs.find((input) => input.name === "יחידה מטפלת")
        if (currentPage === "dashboard") {
          if (unitResponse.value === searchParams.get("room")) {
            if (deletedReport?.reportOpen) {
              setCountRoomReports((prev) => ({ ...prev, roomResponseOpen: prev?.roomResponseOpen?.filter((report) => report._id !== deletedReport._id) }))
            }
            else if (deletedReport?.reportOpen == false) {
              setCountRoomReports((prev) => ({ ...prev, roomResponseClose: prev.roomResponseClose.filter((report) => report._id !== deletedReport._id) }))
            }
          }
          else {
            if (deletedReport?.reportOpen) {
              setCountRoomReports((prev) => ({ ...prev, otherResponseOpen: prev.otherResponseOpen.filter((report) => report._id !== deletedReport._id) }))
            }
            else if (deletedReport?.reportOpen == false) {
              setCountRoomReports((prev) => ({ ...prev, otherResponseClose: prev?.otherResponseClose?.filter((report) => report._id !== deletedReport._id) }))

            }

          }
        }


        setFilteredData((prev) => prev?.filter((report) => report._id != deletedReport?._id))
        setHistoryReports((prev) => prev?.data?.filter((report) => report._id != deletedReport?._id))
      });
      socketIo.on("recive_update_report", ({ hebrewReport, oldReport }) => {
        console.log(hebrewReport, oldReport);
        const currentPage = window?.location?.pathname?.split("/")[1]

        if (currentPage === "dashboard") {

          const oldResponse = oldReport.inputs.find((input) => input.name === "יחידה מטפלת")
          const newResponse = hebrewReport["יחידה מטפלת"]
          const reportStatus = hebrewReport["סטאטוס תקלה"]

          // check if update room response and update the count
          if (oldResponse !== newResponse) {
            // if the response removed from this room response

            // delete the report from old array and push it to new array
            if (oldResponse === searchParams.get("room")) {
              if (reportStatus) {
                setCountRoomReports((prev) => ({ ...prev, roomResponseOpen: prev?.roomResponseOpen?.filter((report) => report._id !== deletedReport._id), otherResponseOpen: [...prev.otherResponseOpen, hebrewReport] }))
              }
              else if (reportStatus == false) {
                setCountRoomReports((prev) => ({ ...prev, roomResponseClose: prev.roomResponseClose.filter((report) => report._id !== deletedReport._id), otherResponseClose: [...prev.otherResponseClose, hebrewReport] }))
              }
            }
            else {
              if (reportStatus) {
                setCountRoomReports((prev) => ({ ...prev, otherResponseOpen: prev.otherResponseOpen.filter((report) => report._id !== deletedReport._id), roomResponseOpen: [...prev.roomResponseOpen, hebrewReport] }))
              }
              else if (deletedReport?.reportOpen == false) {
                setCountRoomReports((prev) => ({ ...prev, otherResponseClose: prev?.otherResponseClose?.filter((report) => report._id !== deletedReport._id), roomResponseClose: [...prev.roomResponseClose, hebrewReport] }))

              }

            }
          }

        }
        setFilteredData((prev) => {
          for (let index = 0; index < prev?.length; index++) {
            if (prev[index]?._id == hebrewReport?._id) {
              prev[index] = hebrewReport
            }
          }
          console.log(prev);

          return prev
        }
        )
      });

      socketIo.on("recive_new_report", ({ newReport, hebrewReport }) => {

        // get the current page to know wich state need to update
        const currentPage = window?.location?.pathname?.split("/")[1]
        console.log(newReport.reportOpen);

        if (currentPage === "dashboard") {
          if (newReport["יחידה מטפלת"] === searchParams.get('room')) {
            setCountRoomReports((prev) => ({ ...prev, roomResponseOpen: [...prev.roomResponseOpen, newReport] }))
          }
          else setCountRoomReports((prev) => ({ ...prev, otherResponseOpen: [...prev.otherResponseOpen, newReport] }))
          setHistoryReports((prev) => ({
            totalCount: [{ total: (prev?.totalCount?.[0]?.total || 0) + 1 }],
            data: [...(prev?.data || []), newReport],
          }));
        }
        else if (currentPage === "open-issue") {

          // console.log(newReport);
          setFilteredData((prev) => [...prev, hebrewReport])
          setColumns((prev) => {
            const tempColumns = [...prev]

            for (let index = 0; index < tempColumns?.length; index++) {
              const key = tempColumns[index].key
              if (Object.hasOwn(hebrewReport, key)) {
                tempColumns[index]?.selectOption?.push({ name: hebrewReport[key] })
              }
            }
            return tempColumns
          })
          console.log(filteredData);

        }
        // this is the report id not _id just numbers
        setNewIdReport((prev) => prev + 1)
      });

    }

  }, [socketIo])

  useEffect(() => {
    if (currentUser) {
      setSocketIo(
        io(baseUrl, { transports: ["websocket", "polling"] })
      );
    }

    console.log("connect");
  }, [currentUser,]);










  return (
    // <ContextStoreProvider>
    <AppRoutes />
    // </ContextStoreProvider>
  )
}

export default App