import { assertEquals } from 'https://deno.land/std@0.152.0/testing/asserts.ts'
import { cookieSign, cookieVerify } from '../index.ts'

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
