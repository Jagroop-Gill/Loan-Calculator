//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //Hide Results
  document.getElementById('results').style.display = 'none';


  //show the loading when submit is clicked
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

function calculateResults(e){
  console.log('Calculating...');
  //UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payments 
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
    //shows results
    document.getElementById('results').style.display = 'block';

    //hides loader
    document.getElementById('loading').style.display = 'none';
  }else{
    showError('Please Check Your Values');
  }


}

function showError(error){
  //Hide Results
  document.getElementById('results').style.display = 'none';
  //hides loader
  document.getElementById('loading').style.display = 'none';

  //create a div
  const errorDiv = document.createElement('div');

  //Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');


  //add class
  errorDiv.className = 'alert alert-danger';

  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}


