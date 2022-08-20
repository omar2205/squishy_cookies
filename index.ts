import { type Cookie, setCookie, getCookies } from './deps.ts'
import { createKey, sign, verify } from './utils.ts'

/**
 * Sign a value with Secret
 *
 * ### usage:
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
 * ### usage:
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

type CookieOptions = Omit<Cookie, 'name' | 'value'>

/**
 * Create a signed cookie. **returns** the cookie string and headers
 *
 * ### usage:
 * ```ts
 * const { cookie } = await createSignedCookie('id', '1', 'super_secret', { httpOnly: true })
 * // id=1....
 * ```
 */
const createSignedCookie = async (
  cookie_name: string,
  cookie_value: string,
  secret: string,
  opts: CookieOptions
) => {
  const value = await cookieSign(cookie_value, secret)

  const cookie: Cookie = {
    name: cookie_name,
    value,
    ...opts,
  }

  const headers = new Headers()
  setCookie(headers, cookie)
  return { headers, cookie: headers.get('set-cookie') || '' }
}

/**
 * Verify a signed cookie.
 *
 * ### usage:
 * ```ts
 * await verifySignedCookie(headers, 'id', 'super_secret')
 * // false or cookie value
 * ```
 */
const verifySignedCookie = async (
  headers: Headers,
  cookie_name: string,
  secret: string
) => {
  const cookie = getCookies(headers)[cookie_name]

  if (cookie && await cookieVerify(cookie, secret)) {
    return cookie
  }
  return false
}

export { cookieSign, cookieVerify, createSignedCookie, verifySignedCookie }
