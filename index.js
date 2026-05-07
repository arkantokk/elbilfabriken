const button = document.getElementById("by");
const button2 = document.getElementById("mountain");
const button3 = document.getElementById("forest");
const button4 = document.getElementById("river");
const submitButton = document.getElementById("submit_btn");
const mapAreaType = document.getElementById('map-area-type');
const sizeInput = document.getElementById('size');

let selectedAreaType = null;
let mapInstance = null;
let marker = null;
let impactLayers = { high: null, moderate: null, low: null };

const gjennomsnittsutslipp = 2420000;

// --- User Interaction: Manual Buttons ---
const typeMap = { 'by': 'city', 'mountain': 'mountain', 'forest': 'forest', 'river': 'river' };
[button, button2, button3, button4].forEach(btn => {
    btn.addEventListener("click", (e) => {
        selectedAreaType = typeMap[e.target.id];
        setActiveButton(selectedAreaType);
        updateMapAreaType();
    });
});

// --- Submit Logic ---
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!selectedAreaType) return alert('Please click the map to select a location first.');
    
    const results = generate_factory_data(selectedAreaType);
    localStorage.setItem("factoryResults", JSON.stringify(results[0]));
    localStorage.setItem("images", JSON.stringify(results[1]));
    window.location.href = "results.html";
});

function generate_factory_data(areaType) {
    let text_list = [];
    let img_list = [];
    const size = parseInt(sizeInput.value) || 0;

    const descriptions = {
        city: ["Urban factories offer economic benefits and jobs, but the high population density means emissions pose a significant respiratory health risk.", "/assets/by.jpg"],
        mountain: ["High-altitude sites provide natural insulation and security, but transport and logistics energy costs are substantially higher.", "/assets/mountain.jpg"],
        forest: ["Building in a forest results in direct habitat loss, though modern sustainable designs can attempt to harmonize with the local ecosystem.", "/assets/forest.jpg"],
        river: ["Coastal or river sites provide essential cooling and shipping routes, but industrial activity risks polluting vital water ecosystems.", "/assets/river.jpg"]
    };
    
    text_list.push(descriptions[areaType][0]);
    img_list.push(descriptions[areaType][1]);

    // Tech Logic
    const hasFilter = document.getElementById("luftFiltrasjon").value === "yes";
    text_list.push(hasFilter ? "Advanced air filtration is active, capturing most pollutants before they enter the atmosphere." : "Without filtration, your factory releases raw industrial byproducts directly into the local environment.");
    img_list.push(hasFilter ? "/assets/airfilter.jpg" : "/assets/noairfilter.webp");

    // CO2 Calculation
    const utslipp = size * 1.55; 
    text_list.push(`Annual CO2 Output: ${utslipp.toLocaleString()} tons. The industry average for this size is approximately ${gjennomsnittsutslipp.toLocaleString()} tons.`);

    return [text_list, img_list];
}

// --- Smarter Geographic Detection ---
async function determineAreaType(latlng) {
    if (!mapInstance) return;
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}&zoom=14&layer=natural,address`;
        const response = await fetch(url);
        const data = await response.json();
        
        const type = data.type || "";
        const category = data.category || "";
        const name = (data.display_name || "").toLowerCase();
        const addr = data.address || {};
        
        let area = null;

        // PRIORITY 1: Water & Coastal Features (Including shoals, reservoirs, and reefs)
        const waterTypes = ['river', 'water', 'valley', 'sea', 'ocean', 'cape', 'island', 'shoal', 'reservoir', 'reef', 'bay'];
        if (category === 'waterway' || category === 'water' || waterTypes.includes(type) || name.includes("fjord") || name.includes("vann") || name.includes("vatnet")) {
            area = 'river';
        } 
        // PRIORITY 2: Mountains & Hills
        else if (['peak', 'mountain_range', 'rock', 'cliff', 'ridge', 'hill'].includes(type) || category === 'mountain') {
            area = 'mountain';
        } 
        // PRIORITY 3: Forest & Rural (Including Nature Reserves)
        else if (['forest', 'wood', 'scrub', 'heath', 'isolated_dwelling', 'farm'].includes(type) || name.includes("marka") || name.includes("reservat")) {
            area = 'forest';
        } 
        // PRIORITY 4: Urban
        else if (['residential', 'industrial', 'commercial', 'retail'].includes(type) || addr.city || addr.town || addr.suburb) {
            area = 'city';
        } 
        // FAILSAFE
        else {
            area = (latlng.lat > 61) ? 'mountain' : 'forest';
        }

        selectedAreaType = area;
        setActiveButton(selectedAreaType);
        updateMapAreaType();
    } catch (error) {
        selectedAreaType = 'forest';
        setActiveButton(selectedAreaType);
        updateMapAreaType();
    }
}

function setActiveButton(areaType) {
    [button, button2, button3, button4].forEach(btn => btn.classList.remove('active'));
    const btnId = areaType === 'river' ? 'river' : (areaType === 'city' ? 'by' : areaType);
    const target = document.getElementById(btnId);
    if (target) target.classList.add('active');
}

function updateMapAreaType() {
    const labels = { city: 'Urban / City', mountain: 'Mountain', forest: 'Forest', river: 'River / Water' };
    mapAreaType.textContent = `Selected area: ${labels[selectedAreaType] || 'None'}`;
}

function updateImpactZones(latlng) {
    [impactLayers.high, impactLayers.moderate, impactLayers.low].forEach(l => l && mapInstance.removeLayer(l));
    const scale = Math.sqrt((parseInt(sizeInput.value) || 1000) / 1000);
    impactLayers.high = L.circle(latlng, { radius: 900 * scale, color: '#ef4444', fillOpacity: 0.25 }).addTo(mapInstance);
    impactLayers.moderate = L.circle(latlng, { radius: 1800 * scale, color: '#f59e0b', fillOpacity: 0.18 }).addTo(mapInstance);
    impactLayers.low = L.circle(latlng, { radius: 3000 * scale, color: '#fbbf24', fillOpacity: 0.12 }).addTo(mapInstance);
}

function initMap() {
    mapInstance = L.map('map').setView([59.9139, 10.7522], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OSM' }).addTo(mapInstance);
    mapInstance.on('click', (e) => {
        if (marker) { marker.setLatLng(e.latlng); } else { marker = L.marker(e.latlng).addTo(mapInstance); }
        updateImpactZones(e.latlng);
        determineAreaType(e.latlng);
    });
}

initMap();