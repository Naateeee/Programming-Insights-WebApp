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
    "UNTV", "Word of God", "ZOE - Light TV 33", "beIN Sports", "National Geographics", 
    "DZMM Teleradyo", "TAP Action Flix", "UPTV", "MPTV", "TAP Edge", "Tech Storm",
    "Mega Channel Mania", "Fox News", "Disney +", "HGTV", "Global Trekker", "MTV", 
    "Fight Sports", "ESPN", "Solar Sports", "Bloomberg", "WWE", "Heart of Asia", "Discovery Asia",
    "Fox Sports", "MPBL", "PTV 4", "Cinema World", "Fashion TV", "AniPlus", "Blast TV", 
    "Euro News", "Paramount", "Cbeebies", "Zoomoo", "Radyo Veritas", "Tapsilog Channel", 
    "Star Movies", "Telenovela Channel", "CNBC", "Egg Network", "GEM TV", "Outdoor Channel",
    "PPOP Channel", "RJTV", "CCTN", "Channel News Asia", "Mango TV", "TLC", "Others", "None"
];

const CONCERNS = [
    // Inquiries:
    "Channel information inquiry",
    "Schedule information inquiry",
    "How to subscribe/load to watch a channel or content",
    "Interested to watch",
    
    // Requests:
    "Request to carry channel or content",
    "Request to reinstate channel or content",
    "Request to carry new channel or content (but no provided details)",
    "Request to air replays",
    "Request for expanded and more extensive coverage",
    "Request for extension or permanent offering of a promo",

    // Complaints:
    "Outdated or old content",
    "Repetitive content",
    "Complaint on removal/takedown of channel or content",
    "Temporarily unavailable, weak, or no signal",
    "Audio or video concerns",
    "EPG issues",
    "Limited number of live games",
    "Limited coverage",
    "Dissatisfaction on the selection of playing teams",
    "Not aired as advertised",
    "Delayed telecast",
    "Logo concerns",

    // Commendations:
    "Appreciation for new channel or content",
    "Appreciation for the promo",
    "Appreciation for a good coverage",
    "Appreciation for timely posting of schedules",
    "Cheers and encouragement to players",

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

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    populateDropdown("channel", CHANNELS);
    populateDropdown("concern", CONCERNS);

    const form = document.getElementById('insightForm');
    
    if (form) { 
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                
                const firstInvalid = form.querySelector(':invalid');
                if (firstInvalid) firstInvalid.focus();
            } else {
                submitData();
            }
        }, false);
    }

    $('.select2').on('change', function() {
    if ($(this).val()) {
        $(this).addClass('is-valid').removeClass('is-invalid');
    } else {
        $(this).addClass('is-invalid').removeClass('is-valid');
    }
});
});

function toggleOthers() {
    const channel = document.getElementById("channel").value;
    const concern = document.getElementById("concern").value;

    document.getElementById("channel_others").style.display = (channel === "Others") ? "block" : "none";
    document.getElementById("concern_others").style.display = (concern === "Others") ? "block" : "none";
}

function showSuccessToast() {
    const toast = new bootstrap.Toast(document.getElementById('successToast'), 
    { delay: 3000 });
    toast.show();
}

function showErrorToast() {
    const toast = new bootstrap.Toast(document.getElementById('errorToast'), 
    { delay: 5000 });
    toast.show();
}

async function submitData() {
    const btn = document.getElementById("submitBtn");
    const form = document.getElementById("insightForm");
    const scriptURL = "https://script.google.com/macros/s/AKfycbw5zI_iZF5Y6_CeVWEOSL0g22B_uIDoXv3VaM1Z5tNsWUCE64kLsfyoXd79-PN7BpTG/exec";

    if (!navigator.onLine) {
        if (typeof showErrorToast === "function") showErrorToast();
        btn.innerHTML = 'Retry Submit';
        return;
    }
    // Gather Data
    const data = {
        irn: document.getElementById("irn").value.trim(),
        channel: document.getElementById("channel").value,
        channel_others: document.getElementById("channel").value === "Others" ? document.getElementById("channel_others").value.trim() : "",
        content: document.getElementById("content").value.trim(),
        concern: document.getElementById("concern").value,
        concern_others: document.getElementById("concern").value === "Others" ? document.getElementById("concern_others").value.trim() : "",
        verbatim: document.getElementById("verbatim").value.trim(),
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
        if (typeof showErrorToast === "function") showErrorToast();
        btn.disabled = false;
        btn.innerHTML = 'Retry Submit';
    });

    setTimeout(() => {
        if (typeof showSuccessToast === "function") showSuccessToast();
        resetForm();
        form.classList.remove("was-validated");
        
        btn.disabled = false;
        btn.innerText = "Submit";
        
        const irnInput = document.getElementById("irn");
        if (irnInput) irnInput.focus();
    }, 400); 
}

function resetForm() {
    const form = document.getElementById("insightForm");
    form.reset();
    
    $('.select2').val(null).trigger('change');
    
    document.getElementById("channel_others").style.display = "none";
    document.getElementById("concern_others").style.display = "none";
}