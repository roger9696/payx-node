import axios, { AxiosInstance } from 'axios';
import { ChargeParams, TransactionResponse } from '../types';

export class ChargeResource {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  /**
   * Initiate a Mobile Money Collection
   * @param params Charge parameters
   * @returns Transaction status
   */
  async create(params: ChargeParams): Promise<TransactionResponse> {
    try {
      const response = await this.client.post<TransactionResponse>('/charge', params);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`PayX Charge Error: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
}
