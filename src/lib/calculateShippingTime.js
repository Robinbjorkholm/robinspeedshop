export default function calculateShippingTime(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  
  if (date.getDay() === 6) {
   
    date.setDate(date.getDate() + 2);
  } else if (date.getDay() === 0) {
   
    date.setDate(date.getDate() + 1);
  }

  return date.toLocaleDateString("en-EN", {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
