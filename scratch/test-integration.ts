import { PayX, Network } from '../src';

async function runIntegrationTest() {
  console.log('🚀 Starting SDK Integration Test...');

  const payx = new PayX({
    apiKey: 'px_test_fc35deb991684b74b70ccf084af5c3c5',
    baseURL: 'http://localhost:3000/api/v1' // Local backend
  });

  try {
    console.log('--- Testing Charge Creation ---');
    const charge = await payx.charge.create({
      amount: 1.0,
      currency: 'GHS',
      phoneNumber: '0551234567',
      network: 'MTN',
      payerMessage: 'SDK Test Payment',
      payeeNote: 'Testing integration'
    });

    console.log('✅ Charge Created:', charge);

    console.log('\n--- Testing Webhook Verification ---');
    const payload = JSON.stringify({ event: 'charge.successful', data: { id: '123' } });
    const secret = 'test_secret';
    // Generate a real HMAC for testing the logic
    const crypto = require('crypto');
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    
    const isValid = payx.webhooks.verifySignature(payload, signature, secret);
    console.log('✅ Webhook Verification Logic:', isValid ? 'PASSED' : 'FAILED');

  } catch (error: any) {
    console.error('❌ Integration Test Failed:', error.message);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
  }
}

runIntegrationTest();
