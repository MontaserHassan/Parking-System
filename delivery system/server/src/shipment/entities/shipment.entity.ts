/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert } from 'typeorm';



@Entity()
export default class Shipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    shipmentNumber: string;

    @Column()
    shipmentName: string;

    @Column()
    receiverName: string;

    @Column()
    senderName: string;

    @Column()
    phoneNumber: string;

    @Column()
    returnLocation: string;

    @Column()
    address: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    submitTime: Date;

    @Column({})
    deliveryTime: string;

    @Column()
    miniumDeliveryTime: number;

    @Column()
    maximumDeliveryTime: number;

    @Column({ type: 'timestamp', nullable: true })
    minDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    maxDate: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeUpdate()
    updateUpdatedAt() {
        this.updatedAt = new Date();
    };

    @BeforeInsert()
    generateShipmentNumber() {
        const length = 8;
        let number = '';
        for (let i = 0; i < length; i++) {
            number += Math.floor(Math.random() * 10);
        };
        this.shipmentNumber = number;
    };

};