import React from 'react';
import { PayPalNamespace, PurchaseUnit, loadScript } from '@paypal/paypal-js';
import useCartStore from 'store/cartStore';
import env from 'config/env';
import { addOrder } from 'api/ordersApi';
import { IOrder } from '@types';

const paypalInit = async (
  paypalRef: React.MutableRefObject<null>,
  setPaid: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<null>>,
  purchase_units: PurchaseUnit[],
  clearCartStore: () => void,
  total: number
) => {
  let paypal: PayPalNamespace | null = null;
  try {
    paypal = await loadScript({
      'client-id': env.PAYPAL_CLIENT!,
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
          const orderRes = await actions.order?.capture();
          setPaid(true);
          if (orderRes) {
            clearCartStore();
          }
          // console.log(orderRes);
          
          const purchasedProducts = orderRes?.purchase_units.map((p: any) => ({
            id: p.reference_id,
            name: p.description,
            price: p.amount.value
          }));
          const order:IOrder = {
            order_id: orderRes?.id,
            products: purchasedProducts,
            total: total,
            buyer: {
              full_name: orderRes?.purchase_units[0]?.shipping?.name?.full_name,
              email: orderRes?.payer.email_address,
              address: orderRes?.purchase_units[0]?.shipping?.address
            }
          };
          const addedOrder = await addOrder(order)
          console.log(addedOrder)
        
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
  const purchase_units = useCartStore(state => state.purchase_units());
  const clearCartStore = useCartStore(state => state.clearCartStore);
  const total = useCartStore(state => state.cartTotal());
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef = React.useRef(null);

  // To show PayPal buttons once the component loads
  React.useEffect(() => {
    // const paypal = await paypalInit ()
    paypalInit(paypalRef, setPaid, setError, purchase_units, clearCartStore, total);
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
