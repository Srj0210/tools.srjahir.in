// Placeholder for future tools

// Example: EMI Calculator function
function calculateEMI(principal, rate, years) {
  let monthlyRate = rate / (12 * 100);
  let n = years * 12;
  let emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
            (Math.pow(1 + monthlyRate, n) - 1);
  return emi.toFixed(2);
}

// Example usage in console
console.log("EMI Example:", calculateEMI(100000, 10, 5));
