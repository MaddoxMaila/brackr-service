import {randomBytes} from 'crypto'
import {Buffer} from 'buffer'

export function generateAPIKey(email: String) {
    const emailHex = Buffer.from(email, 'utf-8').toString('hex')
    const apiKey = `${randomBytes(16).toString('hex')}${emailHex}`;
    const hashedAPIKey = hashAPIKey(apiKey);
    
    return { hashedAPIKey, apiKey };

  }
  
export function hashAPIKey(apiKey: String) {
    const { createHash } = require('crypto');
  
    const hashedAPIKey = createHash('sha256').update(apiKey).digest('hex');
  
    return hashedAPIKey;
}

export function createApiKeyExpireDate(daysToExpire: number){

  let now = new Date();
  return new Date(now.setDate(now.getDate() + daysToExpire))

}