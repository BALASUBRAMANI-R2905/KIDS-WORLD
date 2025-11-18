/**
 * Returns estimated delivery date as a single day, skipping Sundays
 * @param {Date|string} orderDate - starting date
 * @param {number} deliveryDays - days to add
 * @returns {string} formatted date like "Sat, 16 Aug"
 */
export const getEstimatedDelivery = (orderDate, deliveryDays = 4) => {
  const today = orderDate ? new Date(orderDate) : new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

  // Skip Sunday
  if (deliveryDate.getDay() === 0) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }

  return deliveryDate.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};
