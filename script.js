
document.getElementById('carbonForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const electricity = parseFloat(document.getElementById('electricity').value) || 0;
  const transport = parseFloat(document.getElementById('transport').value) || 0;
  const diet = document.getElementById('diet').value;
  const waterHeating = parseFloat(document.getElementById('waterHeating').value) || 0;
  const waterUse = parseFloat(document.getElementById('waterUse').value) || 0;

  const electricityFactor = 0.92;
  const transportFactor = 0.25;
  const dietFactor = diet === 'vegan' ? 1.5 : diet === 'vegetarian' ? 2.5 : 3.8;
  const waterHeatingFactor = 0.00015;
  const waterUseFactor = 0.0003;

  const annualElectricityCO2 = electricity * electricityFactor * 12;
  const annualTransportCO2 = transport * transportFactor * 12;
  const annualDietCO2 = dietFactor * 365;
  const annualWaterHeatingCO2 = waterHeating * waterHeatingFactor * 12;
  const annualWaterUseCO2 = waterUse * waterUseFactor * 12;

  const totalCO2 = annualElectricityCO2 + annualTransportCO2 + annualDietCO2 + annualWaterHeatingCO2 + annualWaterUseCO2;

  document.getElementById('result').innerHTML = `
    <h2>Estimated Annual CO₂ Emissions</h2>
    <p>Electricity: ${annualElectricityCO2.toFixed(2)} kg</p>
    <p>Transport: ${annualTransportCO2.toFixed(2)} kg</p>
    <p>Diet: ${annualDietCO2.toFixed(2)} kg</p>
    <p>Water Heating: ${annualWaterHeatingCO2.toFixed(2)} kg</p>
    <p>Water Use: ${annualWaterUseCO2.toFixed(2)} kg</p>
    <p><strong>Total: ${totalCO2.toFixed(2)} kg CO₂</strong></p>
  `;

  drawChart([
    annualElectricityCO2,
    annualTransportCO2,
    annualDietCO2,
    annualWaterHeatingCO2,
    annualWaterUseCO2
  ]);

  let tips = [];
  if (electricity > 200) tips.push("💡 Reduce electricity use by switching to LED lights and unplugging idle electronics.");
  if (electricity > 400) tips.push("⚡️ High usage? Consider installing solar panels or using a smart meter.");
  if (transport > 500) tips.push("🚲 Use a bike or walk for short distances to cut transport emissions.");
  if (transport > 1000) tips.push("🚗💨 Try carpooling or public transport more often to lower carbon impact.");
  if (diet === 'meat') tips.push("🥦 Go meatless once a week—small changes = big savings in CO₂.");
  if (diet === 'vegetarian' && transport > 500) tips.push("🛵 Pair your eco-eating with greener commuting for double impact.");
  if (waterHeating > 500) tips.push("🚿 A low-flow showerhead can save water and cut hot water usage.");
  if (waterHeating > 1000) tips.push("🔥 Insulate your water heater for better efficiency.");
  if (waterUse > 10000) tips.push("💧 Fix leaks and turn off taps while brushing teeth.");
  if (waterUse > 20000) tips.push("🚰 Upgrade to water-efficient washing machines and faucets.");

  if (tips.length > 0) {
    const tipList = tips.map(t => `<li>${t}</li>`).join('');
    document.getElementById('result').innerHTML += `
      <h3>🌱 Personalized Tips to Reduce Emissions:</h3>
      <ul>${tipList}</ul>
    `;
  }
});
