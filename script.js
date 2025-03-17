document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary DOM elements
    const wacPrice = document.getElementById('wacPrice');
    const secondaryInput = document.getElementById('secondaryInput');
    const result = document.getElementById('result');
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const dynamicLabel = document.getElementById('dynamicLabel');
    const helperText = document.getElementById('helperText');
    const radioButtons = document.getElementsByName('calculationType');

    // Function to update input fields based on selection
    function updateInputFields(isInvoice) {
        if (isInvoice) {
            dynamicLabel.textContent = 'Invoice Price ($):';
            helperText.textContent = '';
        } else {
            dynamicLabel.textContent = 'COG (%):';
            helperText.textContent = 'Please Put COG value here';
        }
        secondaryInput.value = '';
        result.value = '';
    }

    // Add event listeners for radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            updateInputFields(this.value === 'invoice');
        });
    });

    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        const wacValue = parseFloat(wacPrice.value);
        const secondaryValue = parseFloat(secondaryInput.value);
        
        if (isNaN(wacValue) || isNaN(secondaryValue)) {
            alert('Please enter valid numbers');
            return;
        }

        const calculationType = document.querySelector('input[name="calculationType"]:checked').value;
        let calculatedResult;

        if (calculationType === 'invoice') {
            // Calculate COG percentage
            calculatedResult = 100 * ((wacValue - secondaryValue) / wacValue);
            result.value = 'COG is Cost -' + calculatedResult.toFixed(2) + '%';
        } else {
            // Calculate Invoice Price
            calculatedResult = wacValue - (wacValue * (secondaryValue / 100));
            result.value = 'Invoice Price is $' + calculatedResult.toFixed(2);
        }
    });

    // Reset button click handler
    resetBtn.addEventListener('click', function() {
        wacPrice.value = '';
        secondaryInput.value = '';
        result.value = '';
        document.getElementById('invoicePrice').checked = true;
        updateInputFields(true);
    });
});
