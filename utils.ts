import { b64Encode, b64Decode, safeEncode, safeDecode } from './deps.ts'

const encoder = new TextEncoder()
const decoder = new TextDecoder('utf-8')
const StringToBuffer = (s: string) => encoder.encode(s)

/**
 * Creates a CryptoKey from a secret
 */
async function createKey(secret: string) {
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    true,
    ['sign', 'verify']
  )
}

/**
 * Sign data with key
 */
async function sign(key: CryptoKey, data: string) {
  const d = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return safeEncode(b64Encode(d))
}

/**
 * Use key to verify the signature (Signed) against the raw data
 */
async function verify(key: CryptoKey, signature: string, data: string) {
  const signature_decoded = b64Decode(safeDecode(signature))
  return await crypto.subtle.verify(
    'HMAC',
    key,
    signature_decoded,
    encoder.encode(data)
  )
}

export { encoder, decoder, StringToBuffer, createKey, sign, verify }
