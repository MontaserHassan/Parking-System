/* eslint-disable prettier/prettier */
import { translate } from 'google-translate-api-x';
// import { v2 } from '@google-cloud/translate';


async function handleResponseMessage(lang: string, responseMessage: string) {
    // const translateClient = new v2.Translate();
    let newResponseMessage;

    try {
        if (process.env.PROD == '1') {
            const translatedMessage = await translate(responseMessage, { to: lang });
            newResponseMessage = translatedMessage.text;
            // const [translation] = await translateClient.translate(responseMessage, lang);
            // newResponseMessage = translation;
        } else {
            newResponseMessage = responseMessage;
        };
        return newResponseMessage;
    } catch (err) {
        newResponseMessage = responseMessage;
        return newResponseMessage;
    };
};



export {
    handleResponseMessage,
};