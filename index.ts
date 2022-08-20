import { createKey, sign, verify } from './utils.ts'

/**
 * Sign a value with Secret
 * 
 * usage:
 * ```ts
 * const cookie = await cookieSign('hello', 'super_secret')
 * // hello.gsSaKanhysk-CuNkIJhUWsHItAOcFZbrNNTa95qCfAE.
 * ```
 */
const cookieSign = async (value: string, secret: string) => {
  const key = await createKey(secret)
  const data = await sign(key, value)
  return `${value}.${data}`
}

/**
 * Verify an input with Secret
 * 
 * usage:
 * ```ts
 * cookieVerify('hello.gsSaKanhysk-CuNkIJhUWsHItAOcFZbrNNTa95qCfAE.', 'super_secret')
 * // true
 * ```
 */
const cookieVerify = async (input: string, secret: string) => {
  const key = await createKey(secret)

  // get the signature and raw data
  try {
    const inputArr = input.split('.')
    if (inputArr.length !== 3) throw Error('Bad input')

    const [data, signature] = inputArr

    return await verify(key, signature, data)
  } catch (_err) {
    throw Error('Invalid input')
  }
}

export {
  cookieSign,
  cookieVerify
}
