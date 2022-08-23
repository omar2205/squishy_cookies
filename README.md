# Squishy Cookies 🍪

<div align="center">

Easily sign and verify cookies.

<img src="https://user-images.githubusercontent.com/1373867/185759251-6b3a9237-8e79-468a-b0e3-e235927f0267.png" />

> Be Careful out there, there are alpha software out there with no guarantee.

</div>

## Usage

```ts
import {
  cookieSign, cookieVerify
  createSignedCookie, verifySignedCookie,
} from 'mod.ts'

const cookie = await cookieSign('hello', 'super_secret')
// hello.gsSaKanhysk-CuNkIJhUWsHItAOcFZbrNNTa95qCfAE.

await cookieVerify('hello.gsSaKanhysk-CuNkIJhUWsHItAOcFZbrNNTa95qCfAE.', 'super_secret')
// true



const { headers, cookie } = await createSignedCookie(
    'id', '1', 'super_secret',
    { httpOnly: true, path: '/' }
)
return new Response(page, { headers })

// or

const headers = new Headers()
headers.append('set-cookie', cookie)
```
