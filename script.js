// --- Side Menu Functions ---
function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
}
function selectSection(id) {
  showSection(id);
  toggleMenu();
}

// --- Page Logic ---
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

let maintenanceList = [];
let editIndex = -1;
let analysisData = {};
let dashboardCharts = [];

function drawDashboardCharts() {
  let speed = getRandomInt(700, 850);
  let altitude = getRandomInt(32000, 39000);
  let angle = getRandomInt(0, 15);
  let power = getRandomInt(80, 100);
  if (dashboardCharts[0]) dashboardCharts[0].destroy();
  dashboardCharts[0] = new Chart(document.getElementById('flightPerformance'), {
    type: 'bar',
    data: {
      labels: ['Speed', 'Altitude', 'Pitch Angle', 'Engine Power'],
      datasets: [{
        label: 'Flight Performance',
        data: [speed, altitude, angle, power],
        backgroundColor: 'rgba(52, 152, 219, 0.6)'
      }]
    },
    options: { plugins: { legend: { display: false } } }
  });
  document.getElementById('descPerformance').textContent =
    `Avg. Speed: ${speed} knots | Altitude: ${altitude} ft | Pitch: ${angle}° | Power: ${power}%`;

  let arr1 = [getRandomInt(70,100), getRandomInt(65,100), getRandomInt(50,90), getRandomInt(60,100), getRandomInt(60,100)];
  if (dashboardCharts[1]) dashboardCharts[1].destroy();
  dashboardCharts[1] = new Chart(document.getElementById('mechanicalStatus'), {
    type: 'radar',
    data: {
      labels: ['Engine', 'Hydraulics', 'AC', 'Brakes', 'Wings'],
      datasets: [{
        label: 'Mechanical Systems',
        data: arr1,
        backgroundColor: 'rgba(231, 76, 60, 0.3)',
        borderColor: 'rgb(231, 76, 60)'
      }]
    }
  });
  document.getElementById('descMechanical').textContent =
    `Engine: ${arr1[0]}% | Hydraulics: ${arr1[1]}% | AC: ${arr1[2]}% | Brakes: ${arr1[3]}% | Wings: ${arr1[4]}%`;

  let fuel = [getRandomInt(2100, 2500), getRandomInt(2200, 2600), getRandomInt(2150, 2550)];
  let oil = [getRandomInt(60, 75), getRandomInt(62, 77), getRandomInt(61, 76)];
  let exhaust = [getRandomInt(500,540), getRandomInt(505,545), getRandomInt(498,530)];
  if (dashboardCharts[2]) dashboardCharts[2].destroy();
  dashboardCharts[2] = new Chart(document.getElementById('fuelOilExhaust'), {
    type: 'line',
    data: {
      labels: ['Flight 1', 'Flight 2', 'Flight 3'],
      datasets: [
        { label: 'Fuel', data: fuel, borderColor: 'green', fill: false },
        { label: 'Oil Pressure', data: oil, borderColor: 'blue', fill: false },
        { label: 'Exhaust Temp', data: exhaust, borderColor: 'red', fill: false }
      ]
    }
  });
  document.getElementById('descFuel').textContent =
    `Last Reading: Fuel ${fuel[2]} L | Oil ${oil[2]} psi | Exhaust ${exhaust[2]}°C`;

  let f1 = getRandomInt(0, 20), f2 = getRandomInt(0, 20), f3 = getRandomInt(0, 20), f4 = getRandomInt(0, 20);
  if (dashboardCharts[3]) dashboardCharts[3].destroy();
  dashboardCharts[3] = new Chart(document.getElementById('faultCodes'), {
    type: 'doughnut',
    data: {
      labels: ['F01', 'F02', 'F03', 'F04'],
      datasets: [{
        data: [f1, f2, f3, f4],
        backgroundColor: ['#f39c12', '#e74c3c', '#8e44ad', '#3498db']
      }]
    }
  });
  document.getElementById('descFaults').textContent =
    `F01: ${f1} | F02: ${f2} | F03: ${f3} | F04: ${f4}`;
}

function showSection(id) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'dashboard') drawDashboardCharts();
}

function simulateAircraftData() {
  const speed = getRandomInt(700, 850);
  const altitude = getRandomInt(32000, 39000);
  const exhaustTemp = getRandomInt(670, 780);
  const brakesArr = ['Excellent', 'Very Good', 'Average', 'Poor'];
  const hydraulicArr = ['Excellent', 'Very Good', 'Average', 'Poor'];
  const faultsArr = [
    [],
    ['ENG-HEAT'],
    ['BRK-SRV'],
    ['HYD-LOW'],
    ['ENG-HEAT', 'BRK-SRV'],
    ['HYD-LOW', 'BRK-SRV'],
    ['ENG-HEAT', 'HYD-LOW'],
  ];
  const brakes = getRandomElement(brakesArr);
  const hydraulicPressure = getRandomElement(hydraulicArr);
  const faultCodes = getRandomElement(faultsArr);

  let ai = '';
  if (exhaustTemp > 750 || faultCodes.includes('ENG-HEAT')) {
    ai += '🔥 High engine temp — urgent inspection advised\n';
  }
  if (brakes === 'Poor' || brakes === 'Average') {
    ai += '🛑 Brake issue: ' + brakes + '\n';
  }
  if (hydraulicPressure === 'Poor' || hydraulicPressure === 'Average') {
    ai += '💧 Hydraulic system issue: ' + hydraulicPressure + '\n';
  }
  if (!ai) ai = '✅ All systems normal.';

  analysisData = {
    speed,
    altitude,
    exhaustTemp,
    brakes,
    hydraulicPressure,
    faultCodes,
    ai,
    date: new Date().toISOString().split('T')[0],
    technicianNote: document.getElementById('reportInput').value.trim() || 'No notes'
  };

  document.getElementById('aircraftData').innerHTML = `
    <li>Speed: (${analysisData.speed} knots)</li>
    <li>Altitude: (${analysisData.altitude} ft)</li>
    <li>Exhaust Temp: (${analysisData.exhaustTemp}°C)</li>
    <li>Brakes: ${analysisData.brakes}</li>
    <li>Hydraulic Pressure: ${analysisData.hydraulicPressure}</li>
    <li>Fault Codes: ${analysisData.faultCodes.length ? analysisData.faultCodes.join(', ') : 'None'}</li>
  `;

  document.getElementById('aiOutput').innerHTML = `
    <strong>📡 Readings:</strong><br>
    Speed: ${analysisData.speed} knots<br>
    Altitude: ${analysisData.altitude} ft<br>
    Exhaust Temp: ${analysisData.exhaustTemp}°C<br>
    Brakes: ${analysisData.brakes}<br>
    Hydraulic Pressure: ${analysisData.hydraulicPressure}<br>
    Fault Codes: ${analysisData.faultCodes.length ? analysisData.faultCodes.join(', ') : 'None'}<br><br>
    <strong>🤖 Analysis:</strong><br>${analysisData.ai.replace(/\n/g, '<br>')}<br><br>
    <strong>📋 Notes:</strong><br>${analysisData.technicianNote}
  `;
}

function addMaintenanceRow(id, name, status, date, completion, team) {
  maintenanceList.push({ id, name, status, date, completion, team });
  renderMaintenanceTable();
  updateMaintenanceRiskChart();
}
function renderMaintenanceTable() {
  const table = document.getElementById('partsTable');
  table.innerHTML = "";
  maintenanceList.forEach((row, index) => {
    table.innerHTML += `
      <tr>
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.status}</td>
        <td>${row.date}</td>
        <td>${row.completion}</td>
        <td>${row.team}</td>
        <td>
          <button class="edit-btn" onclick="editRow(${index})">✏️</button>
        </td>
        <td>
          <button class="delete-btn" onclick="deleteRow(${index})">🗑️</button>
        </td>
      </tr>
    `;
  });
}
function editRow(index) {
  const row = maintenanceList[index];
  document.getElementById("partId").value = row.id;
  document.getElementById("partName").value = row.name;
  document.getElementById("status").value = row.status;
  document.getElementById("date").value = row.date;
  document.getElementById("completion").value = parseInt(row.completion);
  document.getElementById("team").value = row.team;
  editIndex = index;
  document.getElementById("formCard").style.display = "block";
}
function deleteRow(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    maintenanceList.splice(index, 1);
    renderMaintenanceTable();
    updateMaintenanceRiskChart();
  }
}
document.getElementById("maintenanceForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("partId").value.trim();
  const name = document.getElementById("partName").value.trim();
  const status = document.getElementById("status").value;
  const date = document.getElementById("date").value;
  let completion = document.getElementById("completion").value.trim();
  const team = document.getElementById("team").value.trim();

  const today = new Date().toISOString().split('T')[0];
  if (date < today) {
    alert("You cannot select a past date.");
    return;
  }
  if (completion === "" || isNaN(completion) || completion < 0 || completion > 100) {
    alert("Completion must be between 0 and 100.");
    return;
  }
  completion += "%";

  if (editIndex >= 0) {
    maintenanceList[editIndex] = { id, name, status, date, completion, team };
    editIndex = -1;
  } else {
    if (maintenanceList.some(row => row.id === id)) {
      alert("A task with the same Part ID exists.");
      return;
    }
    maintenanceList.push({ id, name, status, date, completion, team });
  }

  this.reset();
  document.getElementById("formCard").style.display = "none";
  renderMaintenanceTable();
  updateMaintenanceRiskChart();
});
function toggleFormVisibility() {
  const formCard = document.getElementById("formCard");
  formCard.style.display = formCard.style.display === "none" ? "block" : "none";
}
function updateMaintenanceRiskChart() {
  const labels = [];
  const riskCounts = [];

  maintenanceList.forEach(row => {
    let riskLabel = row.status;
    if (riskLabel === "Poor") riskLabel = "High Risk";
    if (riskLabel === "Average") riskLabel = "Medium Risk";
    if (riskLabel === "Very Good" || riskLabel === "Excellent") riskLabel = "Safe";
    let idx = labels.indexOf(riskLabel);
    if (idx === -1) {
      labels.push(riskLabel);
      riskCounts.push(1);
    } else {
      riskCounts[idx]++;
    }
  });

  if (labels.length === 0) {
    labels.push('No Data');
    riskCounts.push(0);
  }

  if (window.maintenanceRiskChart) window.maintenanceRiskChart.destroy();
  window.maintenanceRiskChart = new Chart(document.getElementById('maintenanceRisk'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Risk Level',
        data: riskCounts,
        backgroundColor: labels.map(label =>
          label === 'High Risk' ? 'red' :
          label === 'Medium Risk' ? 'orange' :
          label === 'Safe' ? 'green' : '#3498db'
        )
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });
}

function submitAnalysisToMaintenance() {
  if (!analysisData.speed) return alert("📡 Fetch aircraft data first!");
  analysisData.technicianNote = document.getElementById('reportInput').value.trim() || 'No notes';

  addMaintenanceRow(
    getRandomInt(100,999),
    "Brakes",
    analysisData.brakes,
    analysisData.date,
    getRandomInt(20,60)+"%",
    "Auto System"
  );
  addMaintenanceRow(
    getRandomInt(100,999),
    "Engine",
    analysisData.exhaustTemp > 750 ? "Poor" : "Excellent",
    analysisData.date,
    getRandomInt(10,50)+"%",
    "Auto System"
  );

  document.getElementById('maintenanceAircraftData').innerHTML =
    `📡 Speed: ${analysisData.speed} knots<br>Altitude: ${analysisData.altitude} ft<br>Exhaust: ${analysisData.exhaustTemp}°C`;
  document.getElementById('maintenanceAIAnalysis').innerHTML =
    `🤖 Analysis:<br>${analysisData.ai.replace(/\n/g, '<br>')}`;
  document.getElementById('maintenanceTechnicianNote').innerHTML =
    `📋 Notes:<br>${analysisData.technicianNote}`;

  showSection('maintenance');
}

function submitReport() {
  const input = document.getElementById('reportInput').value.trim();
  const output = document.getElementById('aiOutput');
  if (!input) {
    output.textContent = 'Please enter notes first.';
    return;
  }
  let result = '';
  if (input.includes('noise') || input.includes('vibration') || input.includes('heat')) {
    result = '⚠️ System recommends immediate engine inspection due to abnormal patterns.';
  } else if (input.includes('leak') || input.includes('oil')) {
    result = '⚠️ Possible oil system problem, aircraft should be grounded.';
  } else {
    result = '✅ No hazardous signals detected in the current report.';
  }
  output.textContent = result;
}

window.onload = function() {
  drawDashboardCharts();
  updateMaintenanceRiskChart();
};
