function log(...args) {
  console.log("[AQI]", ...args);
}

/** Handle custom AQI input */
function handleCustomAQI() {
  debugger; // <-- Use this for your screenshot #1
  const inputStr = document.getElementById("aqiInput").value;
  log("Submit clicked. Raw input:", inputStr);

  if (!inputStr || inputStr.trim() === "") {
    log("Validation failed: empty input");
    alert("Please enter a value for AQI.");
    return;
  }

  const aqiValue = Number(inputStr);
  if (Number.isNaN(aqiValue)) {
    log("Validation failed: not a number");
    alert("Please enter a valid number for AQI.");
    return;
  }
  if (aqiValue < 0) {
    log("Validation failed: negative AQI");
    alert("AQI cannot be negative.");
    return;
  }
  if (aqiValue > 300) {
    log("Validation failed: AQI too high");
    alert("Please enter an AQI between 0 and 300.");
    return;
  }

  renderAQI(aqiValue, "Pittsburgh", "manual");
}

/** Load random AQI */
function loadAQIData() {
  debugger; // <-- Use this for your screenshot #2
  const randomAQI = Math.floor(Math.random() * 301);
  log("Random clicked. Generated AQI:", randomAQI);
  renderAQI(randomAQI, "Pittsburgh", "random");
}

/** Render the AQI widget */
function renderAQI(aqiValue, city, source) {
  const cityEl = document.getElementById("city");
  const aqiEl = document.getElementById("aqi");
  const statusEl = document.getElementById("status");
  const icon = document.getElementById("icon");
  const widget = document.getElementById("aqiWidget");

  let status = "";
  let className = "widget";
  let iconUrl = "";

  if (aqiValue <= 50) {
    status = "Good";
    className = "widget good";
    iconUrl = "https://img.icons8.com/emoji/48/000000/sun-emoji.png";
  } else if (aqiValue <= 100) {
    status = "Moderate";
    className = "widget moderate";
    iconUrl = "https://img.icons8.com/emoji/48/000000/cloud-emoji.png";
  } else {
    status = "Unhealthy";
    className = "widget unhealthy";
    iconUrl = "https://img.icons8.com/emoji/48/000000/fire-emoji.png";
  }

  log("Render start:", { aqiValue, city, source, status, className });

  if (widget) widget.className = className;
  if (cityEl) cityEl.textContent = `City: ${city}`;
  if (aqiEl) aqiEl.textContent = `AQI: ${aqiValue}`;
  if (statusEl) statusEl.textContent = `Status: ${status}`;
  if (icon) {
    icon.src = iconUrl;
    icon.style.display = "inline-block";
  }

  log("Render complete at", new Date().toISOString());
}
