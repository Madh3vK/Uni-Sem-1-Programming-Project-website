

 const faqItems = document.querySelectorAll('.faq-question');

 faqItems.forEach(item => {
     item.addEventListener('click', () => {
         const answer = item.nextElementSibling;

         
         if (answer.style.display === 'block') {
             answer.style.display = 'none';
         } else {
             answer.style.display = 'block';
         }
     });
 });
 $(document).ready(function () {
    $(".servicecard").on("click", function () {
        var details = $(this).find(".service-details");
        var visible = details.is(":visible");

        // Close all open details
        $(".service-details").each(function () {
            if ($(this).is(":visible")) {
                $(this).slideUp(300);
                $(this).parent().removeClass("active");
            }
        });

        // Open the clicked one if it's not already visible
        if (!visible) {
            details.slideDown(400);
            $(this).addClass("active");
        }

        // Animate list items one by one (if present)
        var listItems = details.find("ul li");
        var i = 0;
        listItems.each(function () {
            $(this).css({ opacity: 0, marginLeft: "-20px" });
            setTimeout(function (elem) {
                elem.animate({ opacity: 1, marginLeft: "0px" }, 300);
            }, 100 * i, $(this));
            i++;
        });
    });

    $(".servicecard").hover(
        function () {
            var header = $(this).find("h3");
            header.animate({ letterSpacing: "2px" }, 200);
        },
        function () {
            var header = $(this).find("h3");
            header.animate({ letterSpacing: "0px" }, 200);
        }
    );
});


// Mortgage stuff code

document.addEventListener('DOMContentLoaded', function () {
   
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', function () {
        
        const loanAmountInput = document.getElementById('loanAmount').value;
        const loanTermInput = document.getElementById('loanTerm').value;
        const monthlyIncomeInput = document.getElementById('monthlyIncome').value;

        
        const loanAmount = parseFloat(loanAmountInput);
        const loanTerm = parseInt(loanTermInput);
        const monthlyIncome = parseFloat(monthlyIncomeInput);

        
        if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(monthlyIncome)) {
            alert("Please enter numbers in all fields.");
            return;
        }
        if (loanAmount <= 0 || loanTerm <= 0 || monthlyIncome <= 0) {
            alert("Values must be greater than zero.");
            return;
        }

        
        const annualInterestRate = 4.5; 
        const monthlyInterestRate = annualInterestRate / 100 / 12;

        
        const numberOfPayments = loanTerm * 12;

        
        const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
        const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
        const monthlyPayment = numerator / denominator;

        
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - loanAmount;

       
        const incomeThreshold = 0.3 * monthlyIncome; 
        const isEligible = monthlyPayment <= incomeThreshold;

      
        document.getElementById('monthlyPayment').innerText = monthlyPayment.toFixed(2);
        document.getElementById('totalPayment').innerText = totalPayment.toFixed(2);
        document.getElementById('totalInterest').innerText = totalInterest.toFixed(2);

      
        const eligibilityMessage = isEligible
            ? "Eligible"
            : "Loan denied: Monthly payment exceeds 30% of your income.";
        document.getElementById('eligibilityStatus').innerText = eligibilityMessage;

        
        if (isEligible) {
            const remainingIncome = monthlyIncome - monthlyPayment;
            document.getElementById('remainingIncome').innerText = remainingIncome.toFixed(2);
        } else {
            document.getElementById('remainingIncome').innerText = "N/A";
        }

        
        const results = document.getElementById('results');
        results.classList.remove('hidden');
        results.style.display = "block";
    });
});
