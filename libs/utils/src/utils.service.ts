import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';

@Injectable()
export class UtilsService {
    /**
     * Convert any phone format to international format
     *
     * Default country is Vietnam
     *
     * @param phone
     * @param defaultCountry
     * @returns The International format
     */
    toIntlPhone(phone: string, defaultCountry: CountryCode = 'VN') {
        return parsePhoneNumber(phone, defaultCountry).formatInternational();
    }

    /**
     * Convert original text to hash text
     *
     * @param text
     * @returns The hash text
     */
    hashValue(text: string) {
        return hashSync(text, genSaltSync(10));
    }

    /**
     * Compare hash
     *
     * @param text
     * @param hashText
     * @returns result
     */
    compareHash(text: string, hashText: string) {
        return compareSync(text, hashText);
    }
}
