/* eslint-disable prettier/prettier */
// queues.config.ts
export const rabbitMQQueues = [
    {
        name: 'send_email',
        options: {
            durable: true,
        },
    },
    {
        name: 'save_message_contact_us',
        options: {
            durable: true,
        },
    },
];