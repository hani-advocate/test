import CreditCard from '@svg/credit-card.png';
import Wallet from '@svg/sepa.png';
// import Stripe from 'tipsi-stripe';

// export const STRIPE_PUBLIC_KEY =
//   'pk_test_51HmfIeJyYehXW8ay4fwLnl51WWxip2N7p6vDxl6LcBJEvjrpL4w2n5YvACzqpmaGPtJ3v3a4Sc7V7mZnx7EOvJwv00QEymwBhS';

// Stripe.setOptions({
//   publishableKey: STRIPE_PUBLIC_KEY,
//   merchantId: 'merchant.com.de.yalla-liefer',
//   androidPayMode: 'test',
// });

// export const stripe = Stripe;

export const getNativePaymentOptions = ({isGooglePay, plan, price}) => {
  const options = {
    currencyCode: 'EUR',
    countryCode: 'DE',
    // [isGooglePay
    //   ? 'billing_address_required'
    //   : 'requiredBillingAddressFields']: ['all'],
  };
  const items = [
    {
      label: `${plan} Plan Subscription`,
      amount: price.toFixed(2),
    },
    {
      label: 'Yalla-Liefer Inc.',
      amount: price.toFixed(2),
    },
  ];
  if (isGooglePay) {
    options.total_price = price.toFixed(2);
    options.line_items = [
      {
        currency_code: 'EUR',
        description: `Subscribe to Yalla-Liefer ${plan} plan`,
        total_price: price.toFixed(2),
        unit_price: price.toFixed(2),
        quantity: '1',
      },
    ];
  }
  return {options, items};
};

export const PaymentMethods = [
  {
    image: CreditCard,
    desc: '',
    paymentMethod: 'CREDIT',
  },
  {
    image: Wallet,
    desc: '',
    paymentMethod: 'SEPA',
  },
];

export const PLANS_DETAILS = [
  {
    period: 'yearly',
    price: 100,
    data: {
      plan: 'BASIC',
      recurring: 'YEARLY',
    },
    features: [
      'Customize your shop',
      'Get 2 free offers each month',
      'Pay 5€ for each extra offer',
    ],
  },
  {
    period: 'monthly',
    price: 10,
    data: {
      plan: 'BASIC',
      recurring: 'MONTHLY',
    },
    features: [
      'Customize your shop',
      'Get 2 free offers each month & 5€ for each extra offer',
      'Pay 5€ for each extra offer & ',
    ],
  },
  {
    period: 'yearly',
    price: 200,
    data: {
      plan: 'PRO',
      recurring: 'YEARLY',
    },
    features: [
      'Customize your shop',
      'Get 4 free offers each month & 5€ for each extra offer',
      'Unlimited assistants to you help organize orders',
      'Track your shop progress with powerful insights reports',
      '24/7 Support',
      'Pay 5€ for each extra offer',
    ],
  },
  {
    period: 'monthly',
    price: 20,
    data: {
      plan: 'PRO',
      recurring: 'MONTHLY',
    },
    features: [
      'Customize your shop',
      'Get 4 free offers each month & 5€ for each extra offer',
      'Unlimited assistants to you help organize orders',
      'Track your shop progress with powerful insights reports',
      '24/7 Support',
      'Pay 5€ for each extra offer',
    ],
  },
];
