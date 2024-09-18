export default function calculateDiscountedPrice(product) {
  const discount = (100 - product.saleDiscount) / 100;
  const price = product.price * discount;
  return Number(price.toFixed(2));
}
