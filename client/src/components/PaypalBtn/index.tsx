import React from 'react';
import { PayPalNamespace, PurchaseUnit, loadScript } from '@paypal/paypal-js';
import useCartStore from 'store/cartStore';

const paypalInit = async (
  paypalRef: React.MutableRefObject<null>,
  setPaid: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<null>>,
  purchase_units: PurchaseUnit[],
  clearCartStore: () => void
) => {
  let paypal: PayPalNamespace | null = null;
  try {
    paypal = await loadScript({
      'client-id': process.env.REACT_APP_PAYPAL_CLIENT!,
      currency: 'EUR'
    });
  } catch (error) {
    console.error('failed to load the PayPal JS SDK script', error);
  }

  if (paypal && paypal.Buttons) {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order?.capture();
          setPaid(true);
          if (order) {
            clearCartStore();
          }
          console.log(order);
        },
        onError: (err: any) => {
          setError(err);
          console.error(err);
        }
      })
      .render(paypalRef.current as unknown as HTMLElement);
  }
};

export default function PaypalBtn() {
  console.log('PaypalBtn');
  const purchase_units = useCartStore(state => state.purchase_units());
  const clearCartStore = useCartStore(state => state.clearCartStore);
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef = React.useRef(null);

  // To show PayPal buttons once the component loads
  React.useEffect(() => {
    // const paypal = await paypalInit ()
    paypalInit(paypalRef, setPaid, setError, purchase_units, clearCartStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the payment has been made
  if (paid) {
    return <div>Payment successful.!</div>;
  }

  // If any error occurs
  if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
  }

  // Default Render
  return (
    <>
      <div ref={paypalRef} />
    </>
  );
}
