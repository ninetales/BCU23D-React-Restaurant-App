// Converts time 18,0 (18:00) to unix
export const timeToUnixConverter = (hours, minutes) => {
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return Math.floor(date.getTime() / 1000);
};

// Converts and returns unix timestamp to human readable time
export const unixToTimeConverter = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    const date = new Date(milliseconds);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
}