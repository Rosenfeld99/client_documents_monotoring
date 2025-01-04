import React, { useContext, useRef, useState } from 'react'
import AppRoutes from './Routes/AppRoutes'
import "./App.css"
import { ContextStore, ContextStoreProvider } from './context/contextStore'
import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import useUsers from './hooks/useUsers'
import { io } from 'socket.io-client'
import useContextStore from './hooks/useContextStore'

const App = () => {
  const baseUrl = "http://localhost:3001"
  const [searchParams] = useSearchParams()
  const { currentUser } = useUsers()
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
        console.log(data);

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
      socketIo.on("recive_delete_room", ({ spaceWork, subSpaceWork, room }) => {
        const key = `${spaceWork}_${subSpaceWork}_${room}`
        // //saved it
        setCurrentUser((prev) => {


          delete prev?.rooms[key]
          console.log(prev.rooms);

          const UpdateUser = { ...prev, rooms: prev?.rooms }

          return UpdateUser
        })
        console.log();

        if (searchParams.get("sw") === spaceWork && searchParams.get("subSW") === subSpaceWork && searchParams.get("room") === room) {

          localStorage.removeItem("room")
          navigate("/")
        }
      });
      // create input socket
      socketIo.on("recive_update_room", ({ spaceWork, subSpaceWork, newRoomName, oldRoomName }) => {
        console.log("update room");

        const newKey = `${spaceWork}_${subSpaceWork}_${newRoomName}`
        const oldKey = `${spaceWork}_${subSpaceWork}_${oldRoomName}`
        setCurrentUser((prev) => {
          const permission = prev?.rooms[oldKey]
          delete prev?.rooms[oldKey]
          const rooms = { ...prev.rooms, [newKey]: permission }

          const UpdateUser = { ...prev, rooms }
          return UpdateUser
        })

      });
      socketIo.on("recive_update_subSw", ({ spaceWorkName, newSubSpaceWorkName, oldSubSpaceWorkName }) => {
        console.log("update subSw");
        setCurrentUser((prev) => {
          const updateUser = { ...prev }
          updateUser.subSpaceWorks[spaceWorkName][newSubSpaceWorkName] = updateUser?.subSpaceWorks[spaceWorkName][oldSubSpaceWorkName];
          delete updateUser?.subSpaceWorks[spaceWorkName][oldSubSpaceWorkName];

          const newRooms = {}

          Object.keys(prev.rooms).map((roomName) => {
            if (roomName.includes(`${spaceWorkName}_${oldSubSpaceWorkName}`)) {
              const newRoom = roomName.split("_")
              newRooms[`${spaceWorkName}_${newSubSpaceWorkName}_${newRoom[2]}`] = currentUser.rooms[roomName]

            }
            else newRooms[roomName] = currentUser.rooms[roomName]
          })
          updateUser.rooms = newRooms;
          console.log("112");

          return updateUser
        })

      });

      // delete input socket
      socketIo.on("recive_delete_input", (data) => {

        setInputs(data?.inputsArray)
      });
      socketIo.on("recive_update_inputs", (data) => {
        setInputs(data?.updateInputsArray)
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
      socketIo.on("recive_update_report", ({ hebrewReport, updateReport, oldReport }) => {
        console.log(hebrewReport, oldReport);
        const currentPage = window?.location?.pathname?.split("/")[1]
        console.log(oldReport, hebrewReport, updateReport);

        if (currentPage === "dashboard") {

          const oldResponse = oldReport.inputs.find((input) => input.name === "יחידה מטפלת")
          const newResponse = hebrewReport["יחידה מטפלת"]
          const reportStatus = hebrewReport["סטאטוס פנייה"]


          // check if update room response and update the count
          if (oldResponse.value !== newResponse) {

            // if the response removed from this room response

            // delete the report from old array and push it to new array
            if (newResponse === searchParams.get("room")) {

              if (reportStatus) {

                setCountRoomReports((prev) => {
                  const t = { ...prev, roomResponseOpen: [...prev.roomResponseOpen, updateReport], otherResponseOpen: prev?.otherResponseOpen?.filter((report) => report._id !== updateReport._id) }
                  console.log(t);
                  return t
                })
              }
              else if (reportStatus == false) {
                setCountRoomReports((prev) => ({ ...prev, roomResponseClose: [...prev.roomResponseClose, updateReport], otherResponseClose: prev?.otherResponseClose?.filter((report) => report._id !== updateReport._id) }))
              }
            }
            else {
              console.log("180");

              if (reportStatus) {
                setCountRoomReports((prev) => ({ ...prev, otherResponseOpen: [...prev.otherResponseOpen, updateReport], roomResponseOpen: prev?.roomResponseOpen?.filter((report) => report._id !== updateReport._id) }))
              }
              else if (reportStatus == false) {
                setCountRoomReports((prev) => ({ ...prev, otherResponseClose: [...prev.otherResponseClose, updateReport], roomResponseClose: prev?.roomResponseClose?.filter((report) => report._id !== updateReport._id) }))

              }

            }
          }

        }
        else {
          setFilteredData((prev) => {
            const newArray = prev?.map((report) => report._id == hebrewReport?._id ? hebrewReport : report)
            // for (let index = 0; index < prev?.length; index++) {
            //   console.log(prev[index]?._id, hebrewReport?._id);

            //   if (prev[index]?._id == hebrewReport?._id) {
            //     prev[index] = hebrewReport
            //   }
            // }
            // console.log(prev);
            console.log(newArray);


            return newArray
          }
          )

        }
      });

      socketIo.on("recive_new_report", ({ newReport, hebrewReport }) => {

        // get the current page to know wich state need to update
        const currentPage = window?.location?.pathname?.split("/")[1]
        console.log(newReport.reportOpen);

        if (currentPage === "dashboard") {
          // check if the report open
          if (newReport.reportOpen) {
            if (newReport["יחידה מטפלת"] === searchParams.get('room')) {
              // add the report to today open reports and to room response reports
              setCountRoomReports((prev) => ({ ...prev, openTodayReports: [...prev.openTodayReports, newReport], roomResponseOpen: [...prev.roomResponseOpen, newReport] }))
            }
            else setCountRoomReports((prev) => ({ ...prev, otherResponseOpen: [...prev.otherResponseOpen, newReport] }))
          }
          // if report open and close immidatly
          else {
            if (newReport["יחידה מטפלת"] === searchParams.get('room')) {
              // add the report to today open reports and to room response reports
              setCountRoomReports((prev) => ({ ...prev, openTodayReports: [...prev.openTodayReports, newReport], roomResponseClose: [...prev.roomResponseClose, newReport] }))
            }
            else setCountRoomReports((prev) => ({ ...prev, otherResponseClose: [...prev.otherResponseClose, newReport] }))
          }

          setHistoryReports((prev) => ({
            totalCount: [{ total: (prev?.totalCount?.[0]?.total || 0) + 1 }],
            data: [...(prev?.data || []), newReport],
          }));
        }


        else if (currentPage === "open-issue" || currentPage === "issue-history") {

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
        // else if (currentPage === "issue-history") {
        //   setFilteredData((prev) => [...prev, hebrewReport])
        //   setColumns((prev) => {
        //     const tempColumns = [...prev]

        //     for (let index = 0; index < tempColumns?.length; index++) {
        //       const key = tempColumns[index].key
        //       if (Object.hasOwn(hebrewReport, key)) {
        //         tempColumns[index]?.selectOption?.push({ name: hebrewReport[key] })
        //       }
        //     }
        //     return tempColumns
        //   })
        //   console.log(filteredData);

        // }
        // this is the report id not _id just numbers
        setNewIdReport((prev) => prev + 1)
      });
      socketIo.on("recive_create_user", ({ spaceWork, subSpaceWork, room, newUser }) => {

        // get the current page to know wich state need to update
        const currentPage = window?.location?.pathname?.split("/")[1]
        console.log(newUser);
        let newArrayUser
        setFilteredData((prev) => {
          const isExsistIndex = prev?.findIndex((user) => user["מ.א"] === newUser["מ.א"])
          if (isExsistIndex != -1) {

            newArrayUser = [...prev];
            newArrayUser[isExsistIndex] = newUser;

          }
          else {
            newArrayUser = [...prev, newUser]

          }
          console.log(prev);
          return newArrayUser
        })
      });
      socketIo.on("recive_delete_user", ({ deletedUserId, }) => {
        // this is the report id not _id just numbers
        setFilteredData((prev) => {
          const newArrayUser = prev.filter((user) => user["מ.א"] !== deletedUserId)
          return newArrayUser
        })
      });
      socketIo.on("recive_update_user", ({ newReport, hebrewReport }) => {

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