import { assertEquals } from 'https://deno.land/std@0.152.0/testing/asserts.ts'
import {
  cookieSign,
  cookieVerify,
  createSignedCookie,
  verifySignedCookie,
} from '../index.ts'

Deno.test('cookie testing', async (t) => {
  await t.step('sign a cookie', async () => {
    const cookie = await cookieSign('hello', 'super_secret')
    assertEquals(cookie, 'hello.gsSaKanhysk-CuNkIJhUWsHItAOcFZbrNNTa95qCfAE.')
  })

  await t.step('verify a cookie', async () => {
    const res = await cookieVerify(
      'hello.gsSaKanhysk-CuNkIJhUWsHItAOcFZbrNNTa95qCfAE.',
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
      'id=1.GA7yYwRpQqUvy5YbaBCGljYgC-s2VCguiN6jhjPJDNo.; HttpOnly; Path=/'
    )
  })

  await t.step('verify a cookie', async () => {
    const header = new Headers()
    header.set('cookie', cookie)
    const check = await verifySignedCookie(header, 'id', 'super_secret')
    assertEquals(check, true)
  })

  await t.step('verify a cookie - false', async () => {
    const header = new Headers()
    header.set('cookie', 'id=1.GA7yYRpQqUvy5YbaBCGljYgC-s2VCguiN6jhjPJDNo.')
    const check = await verifySignedCookie(header, 'id', 'super_secret')
    assertEquals(check, false)
  })
})
