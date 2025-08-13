(function () {
  // Utility: set content and style
  function setAQI({ aqiValue, city, status, iconUrl }) {
    const widget = document.getElementById("aqiWidget");
    document.getElementById("city").innerText = `City: ${city}`;
    document.getElementById("aqi").innerText = `AQI: ${aqiValue}`;
    document.getElementById("status").innerText = `Status: ${status}`;

    const icon = document.getElementById("icon");
    icon.src = iconUrl;
    icon.style.display = "inline-block";

    widget.classList.remove("good", "moderate", "unhealthy");
    if (status === "Good") widget.classList.add("good");
    else if (status === "Moderate") widget.classList.add("moderate");
    else widget.classList.add("unhealthy");

    console.log(
      `[AQI] Updated -> city=${city}, aqi=${aqiValue}, status=${status}, class=${widget.className}`
    );
  }

  function classifyAQI(aqiValue) {
    if (aqiValue <= 50) {
      return {
        status: "Good",
        iconUrl: "https://img.icons8.com/emoji/48/sun-emoji.png",
      };
    } else if (aqiValue <= 100) {
      return {
        status: "Moderate",
        iconUrl: "https://img.icons8.com/emoji/48/cloud-emoji.png",
      };
    }
    return {
      status: "Unhealthy",
      iconUrl: "https://img.icons8.com/emoji/48/fire-emoji.png",
    };
  }

  // Random button handler
  function loadAQIData() {
    const aqiValue = Math.floor(Math.random() * 301); // 0..300
    const { status, iconUrl } = classifyAQI(aqiValue);

    console.log("[AQI] loadAQIData() random value =", aqiValue);
    setAQI({ aqiValue, city: "Pittsburgh", status, iconUrl });
  }

  // Submit handler with edge-case checks
  function handleCustomAQI() {
    // Uncomment to step through in DevTools:
    // debugger;

    const inputEl = document.getElementById("aqiInput");
    const raw = inputEl.value;
    console.log("[AQI] handleCustomAQI() raw input:", raw);

    if (raw.trim() === "" || isNaN(raw)) {
      alert("Please enter a valid number for AQI.");
      console.warn("[AQI] Invalid input (empty or non-number)");
      return;
    }

    const aqiValue = parseInt(raw, 10);

    if (aqiValue < 0) {
      alert("AQI cannot be negative.");
      console.warn("[AQI] Invalid input (negative):", aqiValue);
      return;
    }
    if (aqiValue > 500) {
      alert("AQI over 500 is not supported in this demo.");
      console.warn("[AQI] Out-of-range (>500):", aqiValue);
      return;
    }

    const { status, iconUrl } = classifyAQI(aqiValue);
    setAQI({ aqiValue, city: "Pittsburgh", status, iconUrl });
  }

  // Wire up events on load (works standalone and inside iframe)
  window.addEventListener("DOMContentLoaded", () => {
    console.log("[AQI] Widget ready (DOMContentLoaded).");
    const btnSubmit = document.getElementById("btnSubmit");
    const btnRandom = document.getElementById("btnRandom");

    if (btnSubmit) btnSubmit.addEventListener("click", handleCustomAQI);
    if (btnRandom) btnRandom.addEventListener("click", loadAQIData);

    // Initial random render so the card isn't blank
    loadAQIData();
  });

  // Expose for inline handlers if needed
  window.loadAQIData = loadAQIData;
  window.handleCustomAQI = handleCustomAQI;
})();
