import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { PayX } from '../src/client';
import { ChargeParams } from '../src/types';

vi.mock('axios');

describe('PayX SDK', () => {
  const apiKey = 'test_api_key';
  let payx: PayX;

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-ignore
    axios.create.mockReturnValue({
      post: vi.fn(),
      get: vi.fn(),
    });
    payx = new PayX({ apiKey });
  });

  it('should initialize with an API key', () => {
    expect(payx).toBeDefined();
    expect(axios.create).toHaveBeenCalledWith(expect.objectContaining({
      headers: expect.objectContaining({
        'x-api-key': apiKey
      })
    }));
  });

  it('should throw error if API key is missing', () => {
    // @ts-ignore
    expect(() => new PayX({})).toThrow('PayX API Key is required');
  });

  describe('ChargeResource', () => {
    it('should create a charge successfully', async () => {
      const mockResponse = {
        data: {
          transactionId: 'tx_123',
          status: 'PENDING',
          message: 'Charge initiated'
        }
      };

      // @ts-ignore
      payx['client'].post.mockResolvedValue(mockResponse);

      const params: ChargeParams = {
        amount: 10,
        currency: 'GHS',
        phoneNumber: '0551234567',
        network: 'MTN',
        payerMessage: 'Test charge'
      };

      const result = await payx.charge.create(params);

      expect(result.transactionId).toBe('tx_123');
      expect(payx['client'].post).toHaveBeenCalledWith('/charge', params);
    });

    it('should handle charge errors', async () => {
      const mockError = {
        isAxiosError: true,
        response: {
          data: { error: 'Invalid phone number' }
        }
      };

      // @ts-ignore
      axios.isAxiosError.mockReturnValue(true);
      // @ts-ignore
      payx['client'].post.mockRejectedValue(mockError);

      await expect(payx.charge.create({} as any)).rejects.toThrow('PayX Charge Error');
    });
  });

  describe('WebhookResource', () => {
    it('should verify valid signatures', () => {
      const secret = 'secret';
      const payload = JSON.stringify({ event: 'charge.completed' });
      const crypto = require('crypto');
      const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

      const isValid = payx.webhooks.verifySignature(payload, signature, secret);
      expect(isValid).toBe(true);
    });

    it('should reject invalid signatures', () => {
      const isValid = payx.webhooks.verifySignature('payload', 'wrong_signature', 'secret');
      expect(isValid).toBe(false);
    });

    it('should return false if params are missing', () => {
      expect(payx.webhooks.verifySignature('', '', '')).toBe(false);
    });
  });
});
