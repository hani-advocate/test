import Stripe from 'tipsi-stripe';

const STRIPE_PUBLIC_KEY =
  'pk_test_51HmfIeJyYehXW8ay4fwLnl51WWxip2N7p6vDxl6LcBJEvjrpL4w2n5YvACzqpmaGPtJ3v3a4Sc7V7mZnx7EOvJwv00QEymwBhS';


Stripe.setOptions({
    publishableKey: STRIPE_PUBLIC_KEY,
    merchantId: 'merchant.com.de.yalla-liefer',
    androidPayMode: 'test',
	});
