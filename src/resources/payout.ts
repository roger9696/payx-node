import axios, { AxiosInstance } from 'axios';
import { PayoutParams, TransactionResponse } from '../types';

export class PayoutResource {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  /**
   * Initiate a Mobile Money Disbursement
   * @param params Payout parameters
   * @returns Transaction status
   */
  async create(params: PayoutParams): Promise<TransactionResponse> {
    try {
      const response = await this.client.post<TransactionResponse>('/payout', params);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`PayX Payout Error: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
}
