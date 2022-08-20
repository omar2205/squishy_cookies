import {
  encode as b64Encode,
  decode as b64Decode,
} from 'https://deno.land/std@0.152.0/encoding/base64.ts'
import {
  encode as safeEncode,
  decode as safeDecode,
} from 'https://esm.sh/url-safe-base64@1.2.0'

export { b64Encode, b64Decode, safeEncode, safeDecode }
