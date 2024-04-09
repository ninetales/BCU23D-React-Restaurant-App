// Converts time 18,0 (18:00) to unix
export const timeToUnixConverter = (hours, minutes) => {
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return Math.floor(date.getTime() / 1000);
};