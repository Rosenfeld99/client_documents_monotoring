export const convertStringToTime = (stringTime) => {

    // Split the string into date and time parts and i need the space
    const [datePart, time] = stringTime.split(", ");

    // Rearrange the date part from DD/MM/YYYY to MM/DD/YYYY (required for Date parsing in JS)
    const [day, month, year] = datePart.split("/");
    const formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate);

    // Create a Date object
    return formattedDate

}
export function compareToToday(dateString) {
    const dateToCompare = new Date(dateString);
    const today = new Date();

    // Normalize both dates to midnight
    const normalizedDateToCompare = new Date(dateToCompare.toDateString());
    const normalizedToday = new Date(today.toDateString());

    if (normalizedDateToCompare.getTime() === normalizedToday.getTime()) {
        return true;
    }
    false
}


