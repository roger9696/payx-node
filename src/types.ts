export interface PayXConfig {
  /**
   * Your PayX API Key (Test or Live)
   */
  apiKey: string;
  /**
   * Optional base URL for the API (defaults to https://api.payx.app/v1)
   */
  baseURL?: string;
}

export type Network = 'MTN' | 'TELECEL' | 'AIRTELTIGO';

export interface ChargeParams {
  amount: number | string;
  phoneNumber: string;
  network: Network;
  currency?: string;
  email?: string;
  payerMessage?: string;
  payeeNote?: string;
  metadata?: Record<string, any>;
}

export interface PayoutParams {
  amount: number | string;
  phoneNumber: string;
  network: Network;
  currency?: string;
  email?: string;
  payerMessage?: string;
  payeeNote?: string;
  metadata?: Record<string, any>;
}

export interface TransactionResponse {
  message: string;
  transactionId: string;
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
  mode?: 'test' | 'live';
}

export interface WebhookEvent {
  event: string;
  data: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    reference: string;
    customer: {
      phone: string;
      network: string;
    };
  };
}
