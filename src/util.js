export default function formatCurrency(num) {
    return "CAD$" + " " + Number(num.toFixed(1)).toLocaleString() + " ";
  }