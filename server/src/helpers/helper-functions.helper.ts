/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Africa/Cairo' });
    const [datePart, timePart] = formattedDate.split(',');
    const finalFormattedDate = `${datePart.trim()} ${timePart.trim()}`;
    return finalFormattedDate;
};

const remainingTime = (date: Date) => {
    const now = new Date();
    const remaining = date.getTime() - now.getTime();
    const seconds = Math.floor(remaining / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return { days, hours, minutes, seconds };
};

const generatedId = (type: 'string' | 'number', length: number, alphabetical: boolean): string | number => {
    const numbers = '0123456789';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const characters = alphabetical ? letters + numbers : numbers;
    let id = '';
    if (alphabetical) {
        // Ensure at least one letter and one number
        const oneLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        const oneNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
        // Fill the remaining characters
        const remainingLength = length - 2;
        for (let i = 0; i < remainingLength; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        };
        // Combine and shuffle to prevent predictable prefix
        id = (oneLetter + oneNumber + id).split('').sort(() => Math.random() - 0.5).join('');
    } else {
        // Only numbers
        for (let i = 0; i < length; i++) {
            id += numbers.charAt(Math.floor(Math.random() * numbers.length));
        };
    };
    if (type === 'number') {
        const numericId = id.replace(/\D/g, '');
        return Number(numericId.slice(0, length)) || Date.now(); // fallback if all chars are filtered out
    };
    return id;
};


const calculateExpiryDate = (date: string, time: string, dayShift: string): { date: string, expiryDate: Date, expiryDurationPerSecond: number, expiryDurationPerHour: number } => {
    const [day, month, year] = date.split('/').map(Number);
    let [hours, minutes] = time.split(':').map(Number);
    if (dayShift.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (dayShift.toUpperCase() === 'AM' && hours === 12) hours = 0;
    const finalDate = new Date(year, month - 1, day, hours, minutes);
    const formattedDate = formatDate(finalDate);
    const expiryDurationPerSecond = Math.floor((finalDate.getTime() - Date.now()) / 1000);
    const expiryDurationPerHour = Math.floor(expiryDurationPerSecond / 3600);
    return { date: formattedDate, expiryDate: finalDate, expiryDurationPerSecond, expiryDurationPerHour };
};



export {
    formatDate,
    remainingTime,
    generatedId,
    calculateExpiryDate,
};