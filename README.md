# PayX Node.js SDK

The official Node.js SDK for the PayX Payment Gateway.

## Installation

```bash
npm install payx-node
# or
yarn add payx-node
```

## Usage

### Initialize the Client

```javascript
const { PayX } = require('payx-node');

const payx = new PayX({
  apiKey: 'your_payx_api_key'
});
```

### Initiate a Mobile Money Charge

```javascript
async function chargeCustomer() {
  try {
    const response = await payx.charge.create({
      amount: 10.0,
      currency: 'GHS',
      phoneNumber: '0551234987',
      network: 'MTN',
      payerMessage: 'Order #1234',
      payeeNote: 'SaaS Subscription'
    });
    
    console.log('Transaction ID:', response.transactionId);
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Charge failed:', error.message);
  }
}
```

### Verify Webhook Signatures

```javascript
const isValid = payx.webhooks.verifySignature(
  req.rawBody, 
  req.headers['x-payx-signature'], 
  'your_webhook_secret'
);
```

## Documentation

For full documentation, visit [docs.payx.company](https://docs.payx.company).
