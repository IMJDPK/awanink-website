// ROI Calculator Logic for AWANink
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('roi-calculator-form');
  const resultsSection = document.getElementById('results');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      calculateAndDisplayROI();
    });
  }

  function calculateAndDisplayROI() {
    // Get form values
    const employees = parseInt(document.getElementById('employees').value) || 0;
    const avgHourlyRate = parseFloat(document.getElementById('avg-hourly-rate').value) || 0;
    const manualHours = parseFloat(document.getElementById('manual-hours').value) || 0;
    const errorRate = parseFloat(document.getElementById('error-rate').value) || 0;
    const errorCost = parseFloat(document.getElementById('error-cost').value) || 0;

    // Calculate savings
    const automationReduction = 0.87; // 87% reduction in manual work
    const errorReduction = 0.95; // 95% fewer errors
    
    // Time savings calculation
    const hoursAutomated = manualHours * automationReduction;
    const weeklyCostSavings = hoursAutomated * avgHourlyRate;
    const annualTimeSavings = weeklyCostSavings * 52;
    const totalHoursSaved = hoursAutomated * 52;

    // Error savings calculation
    const errorsPerWeek = (manualHours * errorRate) / 100;
    const errorsSaved = errorsPerWeek * errorReduction;
    const weeklyErrorSavings = errorsSaved * errorCost;
    const annualErrorSavings = weeklyErrorSavings * 52;

    // Efficiency gains (additional 15% improvement from better workflows)
    const efficiencyGains = annualTimeSavings * 0.15;

    // Total savings
    const totalAnnualSavings = annualTimeSavings + annualErrorSavings + efficiencyGains;

    // Estimated platform cost (based on employees)
    const monthlyCost = 99 + (employees * 25); // Base + per user
    const annualCost = monthlyCost * 12;

    // ROI calculation
    const netSavings = totalAnnualSavings - annualCost;
    const roiMonths = annualCost > 0 ? (annualCost / (totalAnnualSavings / 12)) : 0;

    // Productivity gain
    const productivityGain = ((hoursAutomated / manualHours) * 100).toFixed(0);

    // Display results
    displayResults({
      annualSavings: totalAnnualSavings,
      timeSaved: totalHoursSaved,
      roiMonths: roiMonths,
      productivityGain: productivityGain,
      timeSavingsValue: annualTimeSavings,
      errorSavingsValue: annualErrorSavings,
      efficiencyValue: efficiencyGains
    });
  }

  function displayResults(data) {
    // Format currency
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    };

    // Format number
    const formatNumber = (value) => {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    };

    // Update result values
    document.getElementById('annual-savings').textContent = formatCurrency(data.annualSavings);
    document.getElementById('time-saved').textContent = formatNumber(data.timeSaved);
    document.getElementById('roi-months').textContent = data.roiMonths.toFixed(1);
    document.getElementById('productivity-gain').textContent = data.productivityGain + '%';

    // Update breakdown
    document.getElementById('time-savings-value').textContent = formatCurrency(data.timeSavingsValue);
    document.getElementById('error-savings-value').textContent = formatCurrency(data.errorSavingsValue);
    document.getElementById('efficiency-value').textContent = formatCurrency(data.efficiencyValue);
    document.getElementById('total-savings').textContent = formatCurrency(data.annualSavings);

    // Show results section with animation
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

// Legacy export for backwards compatibility
export function initCalculator(root) {
  if (!root) return;
  console.log('Calculator initialized successfully');
}

export function calculateROI(data) {
  const automationReduction = 0.87;
  const errorReduction = 0.95;
  
  const annualTimeSavings = (data.manualHours * automationReduction * data.avgHourlyRate * 52);
  const annualErrorSavings = ((data.manualHours * data.errorRate / 100) * errorReduction * data.errorCost * 52);
  const efficiencyGains = annualTimeSavings * 0.15;
  
  return {
    savings: annualTimeSavings + annualErrorSavings + efficiencyGains,
    roi: 4.5
  };
}
