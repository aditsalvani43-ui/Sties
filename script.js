let consentGiven = false;

document.getElementById('acceptConsent').addEventListener('click', () => {
  consentGiven = true;
  document.getElementById('consentPopup').style.display = 'none';
  sendDeviceInfo('page_load');
});

document.getElementById('declineConsent').addEventListener('click', () => {
  consentGiven = false;
  document.getElementById('consentPopup').style.display = 'none';
});

// Kalkulator
document.getElementById('calcBtn').addEventListener('click', () => {
  const num1 = parseFloat(document.getElementById('num1').value) || 0;
  const num2 = parseFloat(document.getElementById('num2').value) || 0;
  const result = num1 + num2;
  document.getElementById('calcResult').textContent = result;
  sendDeviceInfo('calculate');
});

// Counter
let clickCount = 0;
document.getElementById('clickBtn').addEventListener('click', () => {
  clickCount++;
  document.getElementById('clickCount').textContent = clickCount;
  sendDeviceInfo('click_button');
});

// Kirim data ke server privat
async function sendDeviceInfo(eventType) {
  if (!consentGiven) return;

  const deviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    timestamp: new Date().toISOString(),
    eventType
  };

  try {
    await fetch('https://YOUR-PRIVATE-SERVER.com/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deviceInfo)
    });
  } catch (err) {
    console.error('Gagal kirim data', err);
  }
  }
