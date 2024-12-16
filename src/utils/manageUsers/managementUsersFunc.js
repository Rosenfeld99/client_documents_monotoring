import { defulteUserAcList } from "./userAccess";
const prevData = []
const nextData = [
    { name: "בחר סביבה", id: 3, value: "" },
    { name: "תת סביבה / רמת הרשאה", id: 2, value: "" },
    { name: "רמת הרשאה / בחר חדר", id: 5, value: "בחר חדר" },
]

export const getListToShow = (userAccessList, setUserAccessList, currentUser, mode, sw, subSw) => {
    console.log(mode);

    if (currentUser) {
        console.log(userAccessList);

        const copyUserOption = { ...userAccessList }

        if (mode === "sw") {
            copyUserOption.currentStep.list = swList(currentUser)
        }
        else if (mode === "subSw") {
            const subSpArray = subSwList(currentUser, sw)
            copyUserOption.currentStep.list = [...subSpArray]
            copyUserOption.listOption[1].list = [...subSpArray]
        }
        else if (mode === "room") {

            copyUserOption.listOption[2].list = roomList(currentUser, sw, subSw)
        }
        // setUserAccessList((prev) => ({ ...prev, listOption: [...prev.listOption, copyUserOption] }))
        setUserAccessList(copyUserOption)
    }
}

export const swList = (currentUser) => {
    const spaceWorkList = Object.keys(currentUser?.spaceWorks)
    return spaceWorkList.map((spName, i) => ({ name: spName, id: spName + i, value: spName }))

}
export const subSwList = (currentUser, sw) => {
    const objOfSubSP = currentUser?.subSpaceWorks[sw]
    console.log(sw);

    const subSpaceWorkList = Object.keys(objOfSubSP)
    const subSpArray = subSpaceWorkList.map((subSpName, i) => ({ name: subSpName, id: subSpName + i, value: subSpName }))
    return subSpArray

}
export const roomList = (currentUser, sw, subSw) => {
    const roomList = []

    for (const key in currentUser?.rooms) {
        if (key.includes(`${sw}_${subSw}`)) {
            const roomName = key.split('_')[2]
            const id = Math.floor(Math.random() * 100)
            roomList.push({ name: roomName, id: id, value: roomName })
        }
    }
    return roomList
}





export const implementGoBack = (index, setAccesList, setUserAccessList, setSteps, accessList, currentUser) => {
    switch (index) {
        case 0:
            // reset the access list to defulte
            setAccesList((prev) => ({ ...prev, currAcc: { id: "" } }));

            // get the list of the spaceWork
            const spaceList = swList(currentUser)

            // get the defult struct of the userAccess list
            const swObj = defulteUserAcList()
            swObj.currentStep.list = spaceList;
            swObj.listOption[0].list = spaceList;
            setUserAccessList(swObj); // Directly call the default function
            setSteps({ prevData: [...prevData], nextData: [...nextData] });
            break;

        case 1:
            // reset the access list to empty id but chosen the spaceWork and delete other(subSw,room)
            setAccesList((prev) => ({ ...prev, currAcc: { id: "", sw: prev?.currAcc?.sw } }));
            // get subSw list to choose
            const subList = subSwList(currentUser, accessList?.currAcc?.sw)

            // get the defult struct of the userAccess list
            const subSObj = defulteUserAcList()

            // set the struct in place 1(תת-סביבה) to get the list of subSw
            subSObj.currentStep.list = subList;
            subSObj.listOption[1].list = subList;
            subSObj.currentStep = subSObj.listOption[1];

            setUserAccessList(subSObj); // Directly call the default function
            const [_, ...remainingNextData] = nextData;
            // get the sw chosen and insert him to firstElement
            const swName = accessList.currAcc.sw
            const firstElement = { name: swName, id: swName, value: swName };
            let prev = []
            prev.push(firstElement);
            // Update nextData to exclude the first element
            setSteps({ prevData: prev, nextData: remainingNextData });
            break;

        case 2:
            // reset the access list to empty id but chosen the spaceWork and delete other(subSw,room)
            setAccesList((prev) => ({ ...prev, currAcc: { id: "", sw: prev?.currAcc?.sw, subSw: prev?.currAcc?.subSw } }));
            // get subSw list to choose
            const roomListToshow = roomList(currentUser, accessList?.currAcc?.sw, accessList?.currAcc?.subSw)
            console.log(roomListToshow);

            // get the defult struct of the userAccess list
            const roomObj = defulteUserAcList()

            // set the struct in place 2(חדר) to get the list of subSw
            roomObj.currentStep.list = roomListToshow;
            roomObj.listOption[2].list = roomListToshow;
            roomObj.currentStep = roomObj.listOption[2];

            setUserAccessList(roomObj); // Directly call the default function
            const remainingNext = [nextData[2]];
            // get the sw chosen and insert him to firstElement
            const swName1 = accessList.currAcc.sw
            const subSw = accessList.currAcc.subSw
            const firstEl = { name: swName1, id: swName1, value: swName1 };
            const secondEl = { name: subSw, id: subSw, value: subSw };
            let pre = []
            pre.push(firstEl);
            pre.push(secondEl);
            // Update nextData to exclude the first element
            setSteps({ prevData: pre, nextData: remainingNext });
            break;
        default:
            break;
    }
}