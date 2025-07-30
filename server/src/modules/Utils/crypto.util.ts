/* eslint-disable prettier/prettier */
import * as crypto from 'crypto';



export default class EncryptionUtil {

    private readonly ENCRYPTION_KEY: Buffer;
    private readonly IV_LENGTH: number;
    private readonly HASHING_KEY = process.env.HASHING_KEY as string;

    constructor() {
        this.ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY as string, 'hex');
        this.IV_LENGTH = Number(process.env.IV_LENGTH);
    };

    async hashData(data: string): Promise<string> {
        try {
            return crypto.createHmac('sha256', this.HASHING_KEY).update(data).digest('hex');
        } catch (error) {
            return '';
        };
    };

    async checkHashData(data: string, hash: string): Promise<boolean> {
        try {
            return crypto.createHmac('sha256', this.HASHING_KEY).update(data).digest('hex') === hash;
        } catch (error) {
            return false;
        };
    };

    encrypt(text: string): string {
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', this.ENCRYPTION_KEY, iv);
        let encrypted = cipher.update(text, 'utf8');
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    };

    decrypt(text: string): string {
        const [ivHex, encryptedTextHex] = text.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encryptedText = Buffer.from(encryptedTextHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.ENCRYPTION_KEY, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString('utf8');
    };

    verifySignature(originalData: string, signature: string, publicKey: string): { valid: boolean; data: string | null } {
        try {
            const formattedKey = publicKey.includes('BEGIN') ? publicKey : `-----BEGIN RSA PUBLIC KEY-----\n${publicKey.trim()}\n-----END RSA PUBLIC KEY-----`;
            const isVerified = crypto.verify(
                'sha256',
                Buffer.from(originalData, 'utf8'),
                { key: formattedKey, padding: crypto.constants.RSA_PKCS1_PADDING, },
                Buffer.from(signature, 'base64'),
            );
            return { valid: isVerified, data: isVerified ? originalData : null, };
        } catch (error) {
            return { valid: false, data: null };
        };
    };

};