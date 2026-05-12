import crypto from 'crypto';

export class WebhookResource {
  /**
   * Verify the signature of a PayX webhook request
   * @param payload The raw body of the request
   * @param signature The x-payx-signature header
   * @param secret Your PayX Webhook Secret (found in Developer Dashboard)
   */
  verifySignature(payload: string, signature: string, secret: string): boolean {
    if (!payload || !signature || !secret) return false;

    const hash = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    return hash === signature;
  }
}
