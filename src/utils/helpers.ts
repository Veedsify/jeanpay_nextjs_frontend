function getCurrencySymbol(currency: "NGN" | "GHS"): string {
  return currency === "NGN" ? "₦" : "GH₵";
}
function formatCurrency(
  amount: number,
  places: number = 2,
  currency: "NGN" | "GHS",
): string {
  return `${getCurrencySymbol(currency)} ${Number(amount).toLocaleString("en-US", { minimumFractionDigits: places, maximumFractionDigits: places })}`;
}

export { getCurrencySymbol, formatCurrency };
