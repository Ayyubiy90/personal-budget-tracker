// Export a function named formatAmount that takes in an amount and a currency code
export const formatAmount = (amount: number, currency: string): string => {
    // Use the Intl.NumberFormat object to format the amount according to the specified currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency', // Set the formatting style to 'currency'
      currency: currency || 'USD', // Use the provided currency code; default to 'USD' if none is provided
    }).format(amount); // Format the amount and return it as a string
  };