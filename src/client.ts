import axios, { AxiosInstance } from 'axios';
import { PayXConfig } from './types';
import { ChargeResource } from './resources/charge';
import { PayoutResource } from './resources/payout';
import { WebhookResource } from './resources/webhooks';

export class PayX {
  private client: AxiosInstance;
  
  public charge: ChargeResource;
  public payout: PayoutResource;
  public webhooks: WebhookResource;

  constructor(config: PayXConfig) {
    if (!config.apiKey) {
      throw new Error('PayX API Key is required');
    }

    this.client = axios.create({
      baseURL: config.baseURL || 'https://pay-x-beryl.vercel.app/api',
      headers: {
        'x-api-key': config.apiKey,
        'Content-Type': 'application/json',
      },
    });

    this.charge = new ChargeResource(this.client);
    this.payout = new PayoutResource(this.client);
    this.webhooks = new WebhookResource();
  }
}
