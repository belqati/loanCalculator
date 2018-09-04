// Listen for Submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
  // hide results
  document.querySelector('#results').style.display = 'none';

  // show loader
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(){
  // UI variables
  const amountUI = document.getElementById('amount');
  const interestUI = document.getElementById('interest');
  const yearsUI = document.getElementById('years');
  const monthlyPaymentUI = document.getElementById('monthlyPayment');
  const totalPaymentUI = document.getElementById('totalPayment');
  const totalInterestUI = document.getElementById('totalInterest');

  // Formulas for calculations
  // grab loan amount as a decimal
  const principal = parseFloat(amountUI.value);
  const calculatedInterest = parseFloat(interestUI.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsUI.value) * 12;
  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // check if monthly payment is finite
  if(isFinite(monthly)){
    monthlyPaymentUI.value = monthly.toFixed(2);
    totalPaymentUI.value = (monthly * calculatedPayments).toFixed(2);
    totalInterestUI.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // show results
    document.querySelector('#results').style.display = 'block';

    // hide loader
    document.querySelector('#loading').style.display = 'none';

  } else {
    showError('Oops, please check your numbers!')
  }
}

// show error
function showError(error){
  // hide results
  document.querySelector('#results').style.display = 'none';

  // hide loader
  document.querySelector('#loading').style.display = 'none';

  // create div
  const errorDiv = document.createElement('div');

  // add class
  errorDiv.className = 'alert alert-danger';

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // insert errorDiv above <h1> heading in card
  card.insertBefore(errorDiv, heading);

  // remove errorDiv after 2 seconds
  setTimeout(clearError, 2500);
}

// clear error
function clearError(){
  document.querySelector('.alert').remove();
}