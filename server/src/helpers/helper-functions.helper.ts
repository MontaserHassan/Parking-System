/* eslint-disable prettier/prettier */
const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Africa/Cairo' });
    const [datePart, timePart] = formattedDate.split(',');
    const finalFormattedDate = `${datePart.trim()} ${timePart.trim()}`;
    return finalFormattedDate;
};



export {
    formatDate,
};