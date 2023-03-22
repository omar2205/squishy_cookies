import { assertEquals } from '../deps.ts'
import {
  cookieSign,
  cookieVerify,
  createSignedCookie,
  verifySignedCookie,
} from '../index.ts'

// holds all cookie operations results
const cookies_res = {
  hello_super_secret: await cookieSign('hello', 'super_secret'),
  id_1_super_secret: await cookieSign('1', 'super_secret'),
  id_1_extra_super_secret: `id=${await cookieSign('1', 'super_secret')}; HttpOnly; Path=/`,
}

Deno.test('cookie testing', async (t) => {
  await t.step('sign a cookie', async () => {
    const cookie = await cookieSign('hello', 'super_secret')
    assertEquals(cookie, cookies_res['hello_super_secret'])
  })

  await t.step('verify a cookie', async () => {
    const res = await cookieVerify(
      cookies_res['hello_super_secret'],
      'super_secret'
    )
    assertEquals(res, true)
  })
})

Deno.test('Creating and verifying cookies', async (t) => {
  let cookie: string

  await t.step('create a signed cookie', async () => {
    ({ cookie } = await createSignedCookie('id', '1', 'super_secret', {
      httpOnly: true,
      path: '/',
    }))
    assertEquals(
      cookie,
      cookies_res['id_1_extra_super_secret']
    )
  })

  await t.step('verify a cookie', async () => {
    const header = new Headers()
    header.set('cookie', cookie)
    const check = await verifySignedCookie(header, 'id', 'super_secret')
    assertEquals(check, cookies_res['id_1_super_secret'])
  })

  await t.step('verify a cookie - false', async () => {
    const header = new Headers()

    // messing with a cookie
    let c = cookies_res['id_1_super_secret']
    c = c.slice(0, 6) + c.slice(7)

    header.set('cookie', c)
    const check = await verifySignedCookie(header, 'id', 'super_secret')
    assertEquals(check, false)
  })

  await t.step('verify a cookie - missing', async () => {
    const header = new Headers()

    header.set('cookie', cookies_res['id_1_super_secret'])
    const check = await verifySignedCookie(header, 'user_id', 'super_secret')
    assertEquals(check, false)
  })
})
