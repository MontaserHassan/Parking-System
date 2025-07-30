/* eslint-disable prettier/prettier */
// src/modules/email/email.consumer.ts
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import MailUtil from '../../Utils/mail.util';



@Controller()
export default class EmailConsumer {

    constructor(private readonly mailUtil: MailUtil) { };

    @EventPattern('send_email')
    async handleEmailSend(@Payload() data: Record<string, any>) {
        try {
            return await this.mailUtil.sendEmail(
                data.email,
                data.userName,
                data.subject,
                data.template,
                {
                    userEmail: data?.email,
                    phoneNumber: data?.phoneNumber,
                    messageId: data?.messageId,
                    content: data?.content,
                },
            );
        } catch (error) {
            console.log('error: ', error);
        };
    };

};