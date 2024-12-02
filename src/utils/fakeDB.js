export const inputsDB = [
    { title: "שם1", id: 1, type: "textArea", placeholder: "1הכנס שם פרטי", require: false, disable: false },
    {
        title: "2שם", id: 2, type: "select",
        options:
            [{ value: "נהוראי" },
            { value: "אלי" },
            { value: "משה" },
            { value: "מנדי" },
            { value: "עומר" },
            { value: "משה" }]
        , placeholder: "הכנס שם פרטי2", require: true, disable: false
    },
    { title: "שם3", id: 3, type: "short", placeholder: "הכנס שם פרטי3", require: false, disable: false },
    { title: "שם4", id: 4, type: "textArea", placeholder: "הכנס שם פרטי4", require: true, disable: false },
    { title: "שם5", id: 5, type: "short", placeholder: "הכנס שם פרטי5", require: false, disable: false },
    { title: "שם6", id: 6, type: "short", placeholder: "הכנס שם פרט6", require: false, disable: false }

]
export const MAX_LENGTH = 15