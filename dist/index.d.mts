import { AxiosInstance } from 'axios';

interface PayXConfig {
    /**
     * Your PayX API Key (Test or Live)
     */
    apiKey: string;
    /**
     * Optional base URL for the API (defaults to https://api.payx.app/v1)
     */
    baseURL?: string;
}
type Network = 'MTN' | 'TELECEL' | 'AIRTELTIGO';
interface ChargeParams {
    amount: number | string;
    phoneNumber: string;
    network: Network;
    currency?: string;
    payerMessage?: string;
    payeeNote?: string;
}
interface PayoutParams {
    amount: number | string;
    phoneNumber: string;
    network: Network;
    currency?: string;
    payerMessage?: string;
    payeeNote?: string;
}
interface TransactionResponse {
    message: string;
    transactionId: string;
    status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
    mode?: 'test' | 'live';
}
interface WebhookEvent {
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

declare class ChargeResource {
    private client;
    constructor(client: AxiosInstance);
    /**
     * Initiate a Mobile Money Collection
     * @param params Charge parameters
     * @returns Transaction status
     */
    create(params: ChargeParams): Promise<TransactionResponse>;
}

declare class PayoutResource {
    private client;
    constructor(client: AxiosInstance);
    /**
     * Initiate a Mobile Money Disbursement
     * @param params Payout parameters
     * @returns Transaction status
     */
    create(params: PayoutParams): Promise<TransactionResponse>;
}

declare class WebhookResource {
    /**
     * Verify the signature of a PayX webhook request
     * @param payload The raw body of the request
     * @param signature The x-payx-signature header
     * @param secret Your PayX Webhook Secret (found in Developer Dashboard)
     */
    verifySignature(payload: string, signature: string, secret: string): boolean;
}

declare class PayX {
    private client;
    charge: ChargeResource;
    payout: PayoutResource;
    webhooks: WebhookResource;
    constructor(config: PayXConfig);
}

export { type ChargeParams, type Network, PayX, type PayXConfig, type PayoutParams, type TransactionResponse, type WebhookEvent };
