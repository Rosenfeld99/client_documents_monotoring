export function decodeFormatDate(inputDate) {
    // Parse the input date
    const [datePart, timePart] = inputDate.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    // Create a Date object
    const date = new Date(year, month - 1, day, hours, minutes);

    // Format the date to ISO string
    const isoString = date.toISOString();

    return isoString;
}