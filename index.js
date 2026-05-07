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

var gjennomsnittsutslipp = 2420000;

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
    selector1 = document.getElementById("luftFiltrasjon")
    if (selector1.value == "yes")
    {
        liste_over_results.push("Installing air filtration in a factory transforms the industrial environment into a healthier, more efficient, and compliant workplace by removing hazardous dust, smoke, oil mists, and fumes. A proper system protects both human health and machinery, leading to fewer breakdowns, higher productivity, and lower operating costs.")
        //utslipp += 10*size
        //fabrikkpris += 2500*size
        img_list.push("/assets/airfilter.jpg")
    }
    else if (selector1.value == "no")
    {
        liste_over_results.push("Not having air filtration in a factory leads to severe, long-term consequences that affect employee health, equipment longevity, product quality, and regulatory compliance. Without filtration, industrial environments—which are often 5 to 10 times more polluted than outdoor air—become hazardous environments, leading to accumulated dust, oil mist, and toxic contaminants in the air.")
        //utslipp += 1*size
        //fabrikkpris += 250*size
        img_list.push("/assets/noairfilter.jpg")
    }
    selector2 = document.getElementById("avfall")
    if (selector2.value == "yes")
    {
        liste_over_results.push("Electric car factories manage waste through a combination of advanced recycling, circular economy practices, and strict water management, aiming to minimize the environmental impact of manufacturing high-voltage batteries and vehicles." +
" Key strategies include managing hazardous waste from battery production, recycling manufacturing scraps, and increasingly adopting closed-loop systems to reuse materials")
        //utslipp += 10*size
        //fabrikkpris += 2500*size
        img_list.push("/assets/waste.jpg")
    }
    else if (selector2.value == "no")
    {
        liste_over_results.push("Failing to implement proper waste management in an electric vehicle (EV) factory causes significant environmental, safety, and regulatory risks, primarily stemming from the toxic components involved in battery manufacturing and electronics. Without appropriate disposal, heavy metals and hazardous chemicals can leach into water sources and soil, creating long-term contamination. ")
        //utslipp += 1*size
        //fabrikkpris += 250*size
        img_list.push("/assets/nowaster.jpg")
    }
    selector3 = document.getElementById("kilde")
    if (selector3.value == "Norway")
    {
        liste_over_results.push("Electric car factories (OEMs) get their supplies from a complex, global, multi-tiered supply chain that begins with mining and ends with battery assembly, heavily dominated by manufacturers in China, Japan, and South Korea. The supply chain is structured into three main stages: upstream (raw materials), midstream (refining and components), and downstream (assembly)." + " If you were to source resources domestically (from Norway) then that would typically make the raw materials pricier, especially considering what raw materials you can find in Norway. Though the price would increase, the emissions would be much lower than many other options, and cause of the shorter distance travel costs would also decrease.")
        //utslipp += 10*size
        //fabrikkpris += 2500*size
        img_list.push("/assets/Norway.png")
    }
    else if (selector3.value == "Germany")
    {
        liste_over_results.push("Electric car factories (OEMs) get their supplies from a complex, global, multi-tiered supply chain that begins with mining and ends with battery assembly, heavily dominated by manufacturers in China, Japan, and South Korea. The supply chain is structured into three main stages: upstream (raw materials), midstream (refining and components), and downstream (assembly)." + " If you were to source resources from Germany, then that would typically make the raw materials, less costly, although not by a very large margin. It would also reduce travel costs and emissions compared to a lot of other places, because of the shorter travel distance.")
        //utslipp += 1*size
        //fabrikkpris += 250*size
        img_list.push("/assets/Germany.jpg")
    }
    else if (selector3.value == "Brazil")
    {
        liste_over_results.push("Electric car factories (OEMs) get their supplies from a complex, global, multi-tiered supply chain that begins with mining and ends with battery assembly, heavily dominated by manufacturers in China, Japan, and South Korea. The supply chain is structured into three main stages: upstream (raw materials), midstream (refining and components), and downstream (assembly)." + " If you were to source resources from Brazil, that would typically make the raw materials cheaper but increase transport cost and distance. The CO2 emissions would also significantly increase cause of the increase in travel distance.")
        //utslipp += 1*size
        //fabrikkpris += 250*size
        img_list.push("/assets/Brazil.jpg")
    }

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
function use_results()
{
    const results = JSON.parse(localStorage.getItem("factoryResults"))
    if (results)
    {
        const text1=document.getElementById("textcontent1")
        text1.textContent =results[0]
        const text2=document.getElementById("textcontent2")
        text2.textContent =results[1]
        const text3=document.getElementById("textcontent3")
        text3.textContent =results[2]
        const text4=document.getElementById("textcontent4")
        text4.textContent =results[3]
        const text5=document.getElementById("textcontent5")
        text5.textContent =results[4] 
        const text6=document.getElementById("textcontent6")
        text6.textContent =results[5] 
        //const text7=document.getElementById("textcontent7")
        //text7.textContent =results[6] 
        
    }
    const images = JSON.parse(localStorage.getItem("images"))
    if (images)
    {
        const img1=document.getElementById("img1")
        img1.src=images[0]
        const img2=document.getElementById("img2")
        img2.src=images[1]
        const img3=document.getElementById("img3")
        img3.src=images[2]
        const img4=document.getElementById("img4")
        img4.src=images[3]
        
    }
    const emissions = JSON.parse(localStorage.getItem("emissions"))
    if (emissions)
    {
        if (emissions[0] < emissions[1])
        {
        const bar1=document.getElementById("yourfactory")
        var heightofbar = (emissions[0] / emissions[1]) * 30
        bar1.style.height = `${heightofbar}rem`
        const bar2=document.getElementById("averagefactory")
        bar2.style.height="30rem"
        }
        else
        {
        const bar1=document.getElementById("yourfactory")
        const bar2=document.getElementById("averagefactory")
        var heightofbar = (emissions[1] / emissions[0]) * 30
        bar2.style.height = `${heightofbar}rem`
        bar1.style.height="30rem"
        }
        }
}  
