

export const newReportId = (roomName, reportCount) => {

    const shortRoomName = roomName[0] + roomName[roomName.length - 1]; // First and last characters
    const timestampPart = String(Date.now()).slice(-2); // Last 2 digits of the timestamp
    const randomPart = Math.floor(Math.random() * 10); // Single random digit
    const uniquePart = (parseInt(timestampPart) + randomPart) % 100; // Ensure 2 digits
    return `${shortRoomName}${reportCount}${uniquePart}`;

}

