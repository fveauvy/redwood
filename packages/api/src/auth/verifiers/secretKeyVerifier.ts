import { WebhookVerificationError, DEFAULT_WEBHOOK_SECRET } from './common'
import type { WebhookVerifier, VerifyOptions } from './common'

export interface SecretKeyVerifier extends WebhookVerifier {
  type: 'secretKeyVerifier'
}

/**
 *
 * Secret Key Verifier
 *
 * Use when the payload is not signed, but rather authorized via a known secret key
 *
 */
export const secretKeyVerifier = (
  _options?: VerifyOptions | undefined
): SecretKeyVerifier => {
  return {
    sign: ({ secret }) => {
      console.warn(
        `With the SecretKeyVerifier verifier, your body isn't signed with a secret`
      )
      return secret
    },
    verify: ({ signature, secret = DEFAULT_WEBHOOK_SECRET }) => {
      const verified = signature === secret

      if (!verified) {
        throw new WebhookVerificationError()
      }

      return verified
    },
    type: 'secretKeyVerifier',
  }
}

export default secretKeyVerifier
