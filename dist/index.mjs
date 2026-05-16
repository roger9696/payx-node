// src/client.ts
import axios3 from "axios";

// src/resources/charge.ts
import axios from "axios";
var ChargeResource = class {
  client;
  constructor(client) {
    this.client = client;
  }
  /**
   * Initiate a Mobile Money Collection
   * @param params Charge parameters
   * @returns Transaction status
   */
  async create(params) {
    try {
      const response = await this.client.post("/charge", params);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`PayX Charge Error: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
};

// src/resources/payout.ts
import axios2 from "axios";
var PayoutResource = class {
  client;
  constructor(client) {
    this.client = client;
  }
  /**
   * Initiate a Mobile Money Disbursement
   * @param params Payout parameters
   * @returns Transaction status
   */
  async create(params) {
    try {
      const response = await this.client.post("/payout", params);
      return response.data;
    } catch (error) {
      if (axios2.isAxiosError(error) && error.response) {
        throw new Error(`PayX Payout Error: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
};

// src/resources/webhooks.ts
import crypto from "crypto";
var WebhookResource = class {
  /**
   * Verify the signature of a PayX webhook request
   * @param payload The raw body of the request
   * @param signature The x-payx-signature header
   * @param secret Your PayX Webhook Secret (found in Developer Dashboard)
   */
  verifySignature(payload, signature, secret) {
    if (!payload || !signature || !secret) return false;
    const hash = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    return hash === signature;
  }
};

// src/client.ts
var PayX = class {
  client;
  charge;
  payout;
  webhooks;
  constructor(config) {
    if (!config.apiKey) {
      throw new Error("PayX API Key is required");
    }
    this.client = axios3.create({
      baseURL: config.baseURL || "https://payx.company/api",
      headers: {
        "x-api-key": config.apiKey,
        "Content-Type": "application/json"
      }
    });
    this.charge = new ChargeResource(this.client);
    this.payout = new PayoutResource(this.client);
    this.webhooks = new WebhookResource();
  }
};
export {
  PayX
};
