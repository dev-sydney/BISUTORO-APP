export const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const asyncActions = (fn, type, dispatch) => () => {
  fn().catch((err) => {
    console.log(err);
    dispatch({
      type,
      payload: err.response.data.message,
    });
  });
};

export class CartItem {
  constructor(
    item = { _id: String, name: String, image: String, price: Number }
  ) {
    this._id = item._id;
    this.qty = 1;
    this.name = item.name;
    this.image = item.image;
    this.price = item.price;
  }

  incrementQty() {
    this.qty++;
    this.price += this.price;
  }
  decreaseQty() {
    if (this.qty <= 1) return;
    this.qty--;
    this.price -= this.price;
  }
}

/**
 * This class creates  'AppAlert' instances that will be used across the various contexts in the application
 */
export class AppAlert {
  /**
   *
   * @param {String} detail The Alert Message itself
   * @param {String} type whether its a 'success' or 'error
   */
  constructor(detail, type) {
    //Setting the alert heading on what alert type it is
    this.heading = type === 'success' ? 'Awesome' : 'Uh Oh';
    this.detail = detail;
    this.type = type;
  }
}
