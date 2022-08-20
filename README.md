# Squishy Cookies 🍪

Easily sign and verify cookies.

> Be Careful out there, there are alpha software with no guarantee

## Usage

```ts
import { cookieSign, cookieVerify } from 'mod.ts'

const cookie = await cookieSign('hello', 'super_secret')
// hello.gsSaKanhysk-CuNkIJhUWsHItAOcFZbrNNTa95qCfAE.

await cookieVerify('hello.gsSaKanhysk-CuNkIJhUWsHItAOcFZbrNNTa95qCfAE.', 'super_secret')
// true
```
