import axios from 'axios';
import { config } from '../Utilss';
import { loadStripe } from '@stripe/stripe-js';
const stripe = loadStripe(
  'pk_test_51LHFLYCzMWGZTWYcO8piuiqgYo6Kj3dSdpihgTmnxEpsRvvbKH3Y1CpKhWGtGcvBgUMuB9vJ7hR82fzhTwuhKUgk00FwuueWL2'
);
export const OrderMeals = async (orders) => {
  try {
    //get the ids of the ordered meals arrays and storing them as a single string
    let mealIds = orders.map((el) => el._id).join(',');
    //pass meal ids as queries + Get the chekout session from the API
    const res = await axios.get(
      `/api/v1/orders/checkout-session/?mealIds=${mealIds}`,
      config
    );
    if (res.data.status === 'success') {
      const { session } = res.data;
      //Create the  chcekout form + change the credit card

      stripe
        .then((res) => {
          res.redirectToCheckout({
            sessionId: session.id,
          });
        })
        .then((res) => {
          if (res.error) {
            console.log(res.error.message);
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
};
