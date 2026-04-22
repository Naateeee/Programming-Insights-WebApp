const CHANNELS = [
    "A2Z", "AllTV", "GMA", "GTV", "IBC 13", "Kapatid Channel SD/HD", "Net 25", 
    "PRTV Prime Media", "PTV", "RJTV", "RPTV SD/HD", "Solar Flix", "TV5 SD/HD", 
    "WilTV", "BuKo", "Kapamilya Channel SD/HD", "MYX", "Sari-Sari", "Horse Racing", 
    "My Cignal", "Xtreme Pinoy", "AXN", "Crime and Investigation", "HITS HD", 
    "HITS Now", "KIX HD", "Lifetime SD", "Lotus Macau", "ROCK Entertainment", 
    "Warner TV HD", "Cinemax HD", "HBO Family HD", "HBO Hits SD/HD", "HBO SD/HD", 
    "HBO Signature HD", "HITS Movies", "ROCK Action", "TAP Movies SD/HD", "Thrill", 
    "Celestial Movies Pinoy", "Cinema One", "Cinemo", "Jeepney TV", "Pinoy Box Office", 
    "Tagalized Movie Channel", "tvN Movies Pinoy", "Viva Cinema", "NBA TV Philippines SD/HD", 
    "One Sports +", "One Sports SD/HD", "PBA Rush SD/HD", "Premier Sports 2 HD", 
    "Premier Sports HD", "SPOTV 1 HD", "SPOTV 2 HD", "Tap Sports", "UAAP Varsity Channel HD", 
    "Animax", "Cartoon Network SD/HD", "Cartoonito", "Dreamworks SD/HD", "Moonbug Kids", 
    "Nick Jr.", "Nickelodeon SD", "ABC Australia", "Arirang TV", "CGTN", "France 24", 
    "KBS World SD", "NHK World - Japan", "TV5 Monde", "tvN Premium HD", "Aliw", 
    "Bilyonaryo Channel", "Al Jazeera TV", "BBC News", "CLTV36", "CNN", "DZRH News TV", 
    "One News SD/HD", "One PH", "True FM TV", "Animal Planet SD", "Asian Food Network SD", 
    "BBC Earth HD", "DepEd TV", "Discovery Channel SD", "History HD", "Knowledge Channel", 
    "Metro Channel", "Travel Channel SD", "EWTN", "GCTV", "INC", "SONSHINE", "TV Maria", 
    "UNTV", "Word of God", "ZOE - Light TV 33", "Others"
];

const CONCERNS = [
    "Want to watch the content/show",
    "Outdated or old content/show",
    "Repetitive content/show",
    "Channel information inquiry",
    "Schedule information inquiry",
    "How to avail",
    "Request to carry channel/content",
    "Request to reinstate channel/content",
    "Request to add new shows",
    "Complaint on removal or takedown",
    "Temporarily unavailable, weak, or no signal",
    "Audio or video concerns",
    "EPG issues",
    "Limited coverage",
    "Not aired as advertised",
    "Delayed telecast",
    "Request to air replays",
    "Others"
];

function populateDropdown(elementId, dataArray) {
    const select = document.getElementById(elementId);
    if (!select) return;

    dataArray.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        select.appendChild(opt);
    });
}

// Initialize everything on load
document.addEventListener("DOMContentLoaded", () => {
    populateDropdown("channel", CHANNELS);
    populateDropdown("concern", CONCERNS);
});

function toggleOthers() {
    const channel = document.getElementById("channel").value;
    const concern = document.getElementById("concern").value;

    document.getElementById("channel_others").style.display = (channel === "Others") ? "block" : "none";
    document.getElementById("concern_others").style.display = (concern === "Others") ? "block" : "none";
}

// Function to show the toast
function showToast() {
    const toastElement = document.getElementById('successToast');
    const toast = new bootstrap.Toast(toastElement, {
        delay: 2500 // Mawawala kusa after 2 seconds
    });
    toast.show();
}

/*
async function submitData() {
    const btn = document.getElementById("submitBtn");
    const scriptURL = "https://script.google.com/macros/s/AKfycbw5zI_iZF5Y6_CeVWEOSL0g22B_uIDoXv3VaM1Z5tNsWUCE64kLsfyoXd79-PN7BpTG/exec";

    // UI Feedback: Disable and show loading
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Syncing...';

    try {
        // Gather Data
        const data = {
            irn: document.getElementById("irn").value.trim(),
            channel: document.getElementById("channel").value,
            channel_others: document.getElementById("channel").value === "Others" ? document.getElementById("channel_others").value.trim() : "",
            content: document.getElementById("content").value.trim(),
            concern: document.getElementById("concern").value,
            concern_others: document.getElementById("concern").value === "Others" ? document.getElementById("concern_others").value.trim() : "",
            verbatim: document.getElementById("verbatim").value.trim()
        };

        // Success Logic
        resetForm();
        showToast();
        // alert("✅ Insight Logged Successfully!");

        
        // const successModal = new bootstrap.Modal(document.getElementById("success-alert-modal"));
        // successModal.show();
        

        // Send Data
        await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(data),
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" }
        });

        // Artificial Delay
        await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
        console.error("Error:", error);
        alert("❌ Failed to submit. Please check your connection.");
    } finally {
        // Reset Button
        btn.disabled = false;
        btn.innerText = "Submit";

        document.getElementById("irn").focus();
    }
}
*/

async function submitData() {
    const btn = document.getElementById("submitBtn");
    const scriptURL = "https://script.google.com/macros/s/AKfycbw5zI_iZF5Y6_CeVWEOSL0g22B_uIDoXv3VaM1Z5tNsWUCE64kLsfyoXd79-PN7BpTG/exec";

    // AHT Calculation Start
    // const endTime = Date.now();
    // const aht = startTime ? Math.round((endTime - startTime) / 1000) : 0;

    // Gather Data
    const data = {
        irn: document.getElementById("irn").value.trim(),
        channel: document.getElementById("channel").value,
        channel_others: document.getElementById("channel").value === "Others" ? document.getElementById("channel_others").value.trim() : "",
        content: document.getElementById("content").value.trim(),
        concern: document.getElementById("concern").value,
        concern_others: document.getElementById("concern").value === "Others" ? document.getElementById("concern_others").value.trim() : "",
        verbatim: document.getElementById("verbatim").value.trim(),
        // aht: aht
    };

    // UI Feedback: Disable and show loading
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Syncing...';

    // Background Sync
    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" }
    }).catch(error => {
        console.error("Background Sync Error:", error);
        // Pwedeng mag-show ng error toast dito kung gusto mo
    });

    setTimeout(() => {
        showToast();   // Labas agad ang Toast sa Top Right
        resetForm();    // Linisin agad ang fields
        
        btn.disabled = false;
        btn.innerText = "Submit";
        
        document.getElementById("irn").focus();
        // startTime = null;
    }, 400); 
}

function resetForm() {
    // Reset inputs
    document.getElementById("irn").value = "";
    document.getElementById("content").value = "";
    document.getElementById("verbatim").value = "";
    document.getElementById("channel_others").value = "";
    document.getElementById("concern_others").value = "";

    // Reset Select2 Dropdowns to placeholder
    $('#channel').val("").trigger('change');

    // Hide Others fields
    document.getElementById("channel_others").style.display = "none";
    document.getElementById("concern_others").style.display = "none";
}