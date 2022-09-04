# Squishy Cookies 🍪

<div align="center">

Easily sign and verify cookies.

<img src="https://user-images.githubusercontent.com/1373867/185759251-6b3a9237-8e79-468a-b0e3-e235927f0267.png" />

> Be Careful out there, there are alpha software out there with no guarantee.

</div>

## Usage

```ts
import {
  createSignedCookie, verifySignedCookie,
} from 'https://deno.land/x/squishy_cookies/mod.ts'

const COOKIE_SECRET = Deno.env.get('COOKIE_SECRET') || 'super_secret'

const { headers, cookie } = await createSignedCookie(
    'id', '1', COOKIE_SECRET,
    { httpOnly: true, path: '/' }
)
return new Response(page, { headers })

// or

const headers = new Headers()
headers.append('set-cookie', cookie)


// Verifying a cookie

headers.append('cookie', cookie) // verifySignedCookie will search for 'cookie' header
const userId = await verifySignedCookie(headers, 'id', COOKIE_SECRET)
// userId is false if the verification failed or the cookie value
if (userId) {
  const user = await getUserById(userId.split('.')[0])
}

```


### Tip to add multiple cookies
```ts
const { cookie: cookie1 } = await createSignedCookie(/* ... */)
const { cookie: cookie2 } = await createSignedCookie(/* ... */)

const response = new Response(someHTML, {
  // using headers as an array of arrays let you use
  // multiple headers with the same name
  headers: [
    ['Set-cookie', cookie1],
    ['Set-cookie', cookie2],
  ]
})
```
