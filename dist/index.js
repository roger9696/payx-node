"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  PayX: () => PayX
});
module.exports = __toCommonJS(index_exports);

// src/client.ts
var import_axios3 = __toESM(require("axios"));

// src/resources/charge.ts
var import_axios = __toESM(require("axios"));
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
      if (import_axios.default.isAxiosError(error) && error.response) {
        throw new Error(`PayX Charge Error: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
};

// src/resources/payout.ts
var import_axios2 = __toESM(require("axios"));
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
      if (import_axios2.default.isAxiosError(error) && error.response) {
        throw new Error(`PayX Payout Error: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
};

// src/resources/webhooks.ts
var import_crypto = __toESM(require("crypto"));
var WebhookResource = class {
  /**
   * Verify the signature of a PayX webhook request
   * @param payload The raw body of the request
   * @param signature The x-payx-signature header
   * @param secret Your PayX Webhook Secret (found in Developer Dashboard)
   */
  verifySignature(payload, signature, secret) {
    if (!payload || !signature || !secret) return false;
    const hash = import_crypto.default.createHmac("sha256", secret).update(payload).digest("hex");
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
    this.client = import_axios3.default.create({
      baseURL: config.baseURL || "https://pay-x-beryl.vercel.app/api",
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PayX
});
