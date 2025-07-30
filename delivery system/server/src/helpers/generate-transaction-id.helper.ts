/* eslint-disable prettier/prettier */
const generateTransactionId = (): number => {
    const newTransactionIdId = Math.floor(Math.random() * (999999999999999 - 100000000000000 + 1) + 100000000000000);;
    return newTransactionIdId;
};



export default generateTransactionId;