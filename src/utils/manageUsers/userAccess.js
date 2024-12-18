
export const defulteUserAcList = () => {
    return new Object({
        listOption: [
            {
                list: [
                ]
                , index: 0,
                title: "בחר סביבה"
            }
            ,
            {
                list: [
                ],
                index: 1,
                title: "תת סביבה / רמת הרשאה"
            }
            ,
            {
                list: [

                ],
                index: 2,
                title: "רמת הרשאה / בחר חדר"
            }
            ,

        ],
        currentStep: {
            list: [

            ],
            index: 0,
            title: "בחר סביבה"
        }
    })
}

// access for rooms
const roomAc = [
    {
        name: "צופה",
        value: "user"
    },
    {
        name: "עורך",
        value: "editor"
    },
]

// access for subSw
const subSWAc = [
    // {
    //     name: "צופה",
    //     value: "user"
    // },
    {
        name: "מנהל",
        value: "admin"
    },
]

// access for sw
const swAc = [
    // {
    //     name: "צופה",
    //     value: "user"
    // },
    {
        name: "מנהל",
        value: "superAdmin"
    },
]

// this func get the curr step of chosen accsess, and return the access obj acording to it
export const userAccess = (sw, subSw, room) => {
    if (sw && !subSw && !room) {
        return swAc
    }
    if (sw && subSw && !room) {
        return subSWAc
    }
    if (sw && subSw && room) {
        return roomAc
    }
}

export const createAndUpdateUserObj = (newUser, adminUserId, userId) => {
    // newUser={id:"",sw?="",subSw?="",room?=""}

    if (!newUser?.role) {
        return
    }
    const userSw = newUser.sw
    const userSubSw = newUser.subSw
    const userRoom = newUser.room

    //  here i checked if in newUser obj has just sw and role so the role will be chosen role
    const swAcces = userSw && !userSubSw && !userRoom ? newUser.role : "user"
    //  here i checked if in newUser obj has subSw and not room,  so the role will be chosen role
    const subSwAcces = userSubSw && !userRoom ? newUser.role : "user"
    //  here i checked if in newUser obj has room, so the role will be chosen role
    const roomAcces = userRoom ? newUser.role : "user"

    const user = {
        userToCreate: {
            spaceWork: {
                name: userSw,
                role: swAcces
            },
            subSpaceWork: {
                name: userSubSw,
                role: subSwAcces
            },
            room: {
                name: userRoom,
                role: roomAcces
            },
            userId: userId,
            job: "מתכנת",
            unit: "תקשוב",
            lastName: "נהוראי",
            firstName: "עטיה"
        },
        adminId: adminUserId
    }
    return user
}
