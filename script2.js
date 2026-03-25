// Initial values matching the image proportions
let data = {
    housing: 400,
    food: 250,
    transport: 150,
    bills: 100,
    misc: 100
};

const colors = {
    housing: "#e06666",
    food: "#6aa84f",
    transport: "#f1c232",
    bills: "#3d85c6",
    misc: "#e69138"
};

function updateChart() {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    let currentPercent = 0;
    let gradientParts = [];

    for (let key in data) {
        let percent = (data[key] / total) * 100;
        let endPercent = currentPercent + percent;
        gradientParts.push(`${colors[key]} ${currentPercent}% ${endPercent}%`);
        currentPercent = endPercent;
    }

    document.getElementById('chart').style.background = `conic-gradient(${gradientParts.join(', ')})`;
}

function addExpense() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    // Add new amount to existing category
    data[category] += amount;
    
    // Refresh the chart
    updateChart();
    
    // Clear input
    document.getElementById('amount').value = "";
}

// Initialize on load
updateChart();