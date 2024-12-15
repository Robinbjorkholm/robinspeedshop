export default function calculateTotalPrice(price, quantity) {
    const totalPrice = price * quantity;

    return totalPrice.toFixed(2);
  };