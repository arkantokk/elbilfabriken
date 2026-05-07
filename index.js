const button = document.getElementById("by")
const button2 = document.getElementById("mountain")
const button3 = document.getElementById("forest")
const button4 = document.getElementById("river")
const submitButton = document.getElementById("submit_btn")
let selectedAreaType = null;
const mapElement = document.getElementById('map');
const mapAreaType = document.getElementById('map-area-type');
let mapInstance = null;
let marker = null;
let impactLayers = {
    high: null,
    moderate: null,
    low: null
};

const gjennomsnittsutslipp = 2420000;

button.addEventListener("click", () => {
    selectedAreaType = 'city';
    setActiveButton('city');
    updateMapAreaType();
});
button2.addEventListener("click", () => {
    selectedAreaType = 'mountain';
    setActiveButton('mountain');
    updateMapAreaType();
});
button3.addEventListener("click", () => {
    selectedAreaType = 'forest';
    setActiveButton('forest');
    updateMapAreaType();
});
button4.addEventListener("click", () => {
    selectedAreaType = 'river';
    setActiveButton('river');
    updateMapAreaType();
});

const resultbtn = document.getElementById("resultsbutton")

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!selectedAreaType) {
        alert('Click the map to choose an area type first.');
        return;
    }
    var results = get_results(selectedAreaType)

    const resultsContainer = document.getElementById("results-container");
    resultsContainer.classList.add("active");

    localStorage.setItem("factoryResults", JSON.stringify(results[0]))
    localStorage.setItem("images", JSON.stringify(results[1]))
    window.location.href = "results.html"
});

function get_results(areaType) {
    var utslipp = 0
    var fabrikkpris = 0
    var text = document.getElementById("resultsinfo")
    var liste_over_results = []
    var img_list = []
    var label = document.getElementById("size")
    var size = parseInt(label.value)
    if (areaType === 'city') {
        liste_over_results.push(`Building a factory next to a city acts as a catalyst for both economic development and environmental/social disruption. It creates jobs, lowers commuting times, and increases tax revenue, but it often brings pollution, traffic congestion, and lower quality of life to nearby residential areas.
\nDownsides:
\n• Pollution
\n• Traffic congestion
\n• CO2 output from a factory located next to a city directly impacts the local environment and population, contributing to both immediate air quality issues and long-term global climate change. While co2 itself is a colorless, odorless gas, it is usually emitted alongside other pollutants—such as nitrogen oxides (Nox) sulfur dioxide (so2), and particulate matter (PM2.5)—that cause smog, respiratory issues, and cardiovascular problems in surrounding residential areas.
\nBenefits:
\n• Economic development
\n• Environmental/social disruption
\n• It creates jobs
\n• Lowers commuting times
\n• Increases tax revenue
 `)
        img_list.push("/assets/by.jpg")
    } else if (areaType === 'mountain') {
        liste_over_results.push(`Building a factory in or on a mountain presents unique engineering challenges, high logistical costs, and significant environmental considerations, but it can offer benefits such as natural security, stable temperatures, and high-profit margins due to specialized production.

\nDownsides:
\n• High logistics costs
\n• Significant environmental considerations
\nBenefits:
\n• Natural security
\n• Stable temperature
\n• Specialized production
`)
        img_list.push("/assets/mountain.jpg")
    } else if (areaType === 'forest') {
        liste_over_results.push(`
Building a factory in a forest initiates significant, long-term changes to the local ecosystem, ranging from habitat destruction to altered air and water quality. While conventional construction typically damages these environments, modern "factory-as-a-forest" approaches aim to blend industrial activity with ecological restoration. 
\nDownsides:
\n• Long-term changes to the local ecosystem, including: Habitat destruction and Altered air and water quality
\n• Modern "factory-as-a-forest" approaches aim to blend industrial activity with ecological restoration
\nBenefits: 
\n• The trees in the surrounding forest absorb a portion of the factory's CO2 emissions. Through photosynthesis
`)
        img_list.push("/assets/forest.jpg")
    } else if (areaType === 'river') {
        liste_over_results.push(`Building a factory in a river valley generally serves logistical and operational needs—such as water access and transport—but frequently leads to significant environmental degradation, increased pollution, and higher risks of flooding for surrounding areas. While it can bring economic growth and jobs, these benefits are often overshadowed by long-term damage to ecosystems and public health.
\nDownsides:
\n• Logistical and operational needs, including: Water access and Transport
\n• Significant environmental degradation
\n• Increased pollution
\n• Higher risks of flooding the surrounding areas
\n• Long-term damage to ecosystems and public health
\n• CO2 emissions from a factory in a river valley tend to become trapped near the ground due to the surrounding topography, which restricts horizontal wind dispersion. This creates localized high-concentration areas, especially during temperature inversions where cool, dense air (carrying the CO2) is capped by warmer air above. 
\nBenefits:
\n• Economic growth and jobs
`)
        img_list.push("/assets/river.jpg")
    }

    selector1 = document.getElementById("luftFiltrasjon")
    if (selector1.value == "yes") {
        liste_over_results.push("Installing air filtration in a factory transforms the industrial environment into a healthier, more efficient, and compliant workplace by removing hazardous dust, smoke, oil mists, and fumes. A proper system protects both human health and machinery, leading to fewer breakdowns, higher productivity, and lower operating costs.")
        img_list.push("/assets/airfilter.jpg")
    }
    else if (selector1.value == "no") {
        liste_over_results.push("Not having air filtration in a factory leads to severe, long-term consequences that affect employee health, equipment longevity, product quality, and regulatory compliance. Without filtration, industrial environments—which are often 5 to 10 times more polluted than outdoor air—become hazardous environments, leading to accumulated dust, oil mist, and toxic contaminants in the air.")
        img_list.push("/assets/noairfilter.webp")
    }
    selector2 = document.getElementById("avfall")
    if (selector2.value == "yes") {
        liste_over_results.push("Electric car factories manage waste through a combination of advanced recycling, circular economy practices, and strict water management, aiming to minimize the environmental impact of manufacturing high-voltage batteries and vehicles." +
            " Key strategies include managing hazardous waste from battery production, recycling manufacturing scraps, and increasingly adopting closed-loop systems to reuse materials")
        img_list.push("/assets/by.jpg")
    }
    else if (selector2.value == "no") {
        liste_over_results.push("you answered no, but we havent filled in this text yet")
        img_list.push("/assets/by.jpg")
    }
    selector3 = document.getElementById("kilde")
    if (selector3.value == "Norway") {
        liste_over_results.push("you answered Norway, but we havent filled in this text yet")
        img_list.push("/assets/by.jpg")
    }
    else if (selector3.value == "Germany") {
        liste_over_results.push("you answered Germany, but we havent filled in this text yet")
        img_list.push("/assets/by.jpg")
    }
    else if (selector3.value == "Brazil") {
        liste_over_results.push("you answered Brazil, but we havent filled in this text yet")
        img_list.push("/assets/by.jpg")
    }


    if (size < 2300) {
        liste_over_results.push(`Having a small-sized factory—often defined as a micro-factory or small-scale manufacturing unit—presents a mix of strategic advantages and operational constraints. Small factories often benefit from high flexibility and lower overhead, but they face limitations in production capacity, efficiency, and resource access.`)
        img_list.push("/assets/by.jpg")
    }
    else if (size > 2300) {
        if (size > 10000) {
            liste_over_results.push(`Its a large factory, but we havent filled in this text yet`)
            img_list.push("/assets/by.jpg")
        }
        else {
            liste_over_results.push(`A medium-sized factory (typically defined as having 50–250 employees and 10,000–50,000 square feet) operates as a balance between the agility of a small workshop and the capability of a large plant, acting as a "middle ground" for growth.`)
            img_list.push("/assets/by.jpg")
        }

    }
    utslipp += size 
    utslipp += size * 0.55 

    if (utslipp < gjennomsnittsutslipp) {
        utslippmin = gjennomsnittsutslipp - utslipp
        liste_over_results.push(`Your factory put out ${utslipp} ton CO2 per year, thats ${utslippmin} ton less than the average electric car factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`)
    }
    else {
        utslippmin = utslipp - gjennomsnittsutslipp
        liste_over_results.push(`Your factory put out ${utslipp} ton CO2 per year, thats ${utslippmin} ton more than the average electric car factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`)
    }
    var list1og2 = [liste_over_results, img_list]
    return list1og2
}

function getSelectedAreaType() {
    return selectedAreaType;
}

async function determineAreaType(latlng) {
    if (!mapInstance || !mapElement) return null;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`);
        const data = await response.json();
        
        const type = data.type || "";
        const category = data.category || "";
        let area = 'forest';

        // 1. Water check
        if (category === 'waterway' || type === 'river' || type === 'stream' || type === 'water') {
            area = 'river';
        } 
        // 2. Forest check (Adding 'croft' and 'historic' logic here as they are usually rural)
        else if (type === 'forest' || type === 'wood' || type === 'orchard' || type === 'croft') {
            area = 'forest';
        } 
        // 3. City check
        else if (type === 'residential' || type === 'industrial' || type === 'commercial' || category === 'highway' || data.address.city || data.address.town) {
            // Check to make sure it's not a rural suburb like "Marka"
            if (data.address.suburb === 'Marka') {
                area = 'forest';
            } else {
                area = 'city';
            }
        } 
        // 4. Mountain check
        else if (type === 'peak' || type === 'mountain_range' || type === 'fell' || type === 'rock' || type === 'cliff') {
            area = 'mountain';
        } 
        else {
            area = calculateFallbackAreaType(latlng.lat, latlng.lng);
        }

        selectedAreaType = area;
        setActiveButton(selectedAreaType);
        updateMapAreaType();
        return selectedAreaType;

    } catch (error) {
        selectedAreaType = calculateFallbackAreaType(latlng.lat, latlng.lng);
        setActiveButton(selectedAreaType);
        updateMapAreaType();
        return selectedAreaType;
    }
}

function calculateFallbackAreaType(lat, lon) {
    if (lat > 68) return 'mountain';
    if (lat < 58) return 'city';
    if (lon > 25) return 'forest';
    if (lon < 5) return 'river';
    if (lat > 62 && lon < 12) return 'mountain';
    if (lat < 61 && lon > 8 && lon < 18) return 'city';
    return 'forest';
}

function setActiveButton(areaType) {
    button.classList.toggle('active', areaType === 'city');
    button2.classList.toggle('active', areaType === 'mountain');
    button3.classList.toggle('active', areaType === 'forest');
    button4.classList.toggle('active', areaType === 'river');
}

function getSelectedAreaLabel(type) {
    if (type === 'city') return 'Urban / City'
    if (type === 'mountain') return 'Mountain'
    if (type === 'forest') return 'Forest'
    if (type === 'river') return 'River / Water'
    return 'None'
}

function updateMapAreaType() {
    if (!mapAreaType) return;
    const selectedType = getSelectedAreaType();
    if (selectedType) {
        mapAreaType.textContent = `Selected area: ${getSelectedAreaLabel(selectedType)}`
    } else {
        mapAreaType.textContent = 'Selected area: click the map to choose an area type'
    }
}

function updateImpactZones(latlng) {
    if (!mapInstance) return;

    if (impactLayers.high) mapInstance.removeLayer(impactLayers.high);
    if (impactLayers.moderate) mapInstance.removeLayer(impactLayers.moderate);
    if (impactLayers.low) mapInstance.removeLayer(impactLayers.low);
    
    const sizeInput = document.getElementById('size');
    const factorySize = parseInt(sizeInput.value) || 1000;
    const scaleFactor = Math.sqrt(factorySize / 1000);
    
    impactLayers.high = L.circle(latlng, {
        radius: 900 * scaleFactor,
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.25
    }).addTo(mapInstance);

    impactLayers.moderate = L.circle(latlng, {
        radius: 1800 * scaleFactor,
        color: '#f59e0b',
        fillColor: '#f59e0b',
        fillOpacity: 0.18
    }).addTo(mapInstance);

    impactLayers.low = L.circle(latlng, {
        radius: 3000 * scaleFactor,
        color: '#fbbf24',
        fillColor: '#fbbf24',
        fillOpacity: 0.12
    }).addTo(mapInstance);
}

function placeFactory(latlng) {
    if (!mapInstance) return;
    if (marker) {
        marker.setLatLng(latlng);
    } else {
        marker = L.marker(latlng, { draggable: true }).addTo(mapInstance);
        marker.on('dragend', function (e) {
            updateImpactZones(e.target.getLatLng());
        });
    }
    updateImpactZones(latlng);
}

function initMap() {
    if (!mapElement) return;
    mapInstance = L.map('map').setView([59.9139, 10.7522], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);
    
    mapInstance.on('click', async function (e) {
        placeFactory(e.latlng);
        await determineAreaType(e.latlng);
    });

    const sizeInput = document.getElementById('size');
    sizeInput.addEventListener('input', function() {
        if (marker) {
            updateImpactZones(marker.getLatLng());
        }
    });
    
    updateMapAreaType();
}

function use_results() {
    const results = JSON.parse(localStorage.getItem("factoryResults"))
    if (results) {
        for(let i=0; i<7; i++){
            const el = document.getElementById(`textcontent${i+1}`);
            if(el) el.textContent = results[i];
        }
    }
    const images = JSON.parse(localStorage.getItem("images"))
    if (images) {
        for(let i=0; i<4; i++){
            const el = document.getElementById(`img${i+1}`);
            if(el) el.src = images[i];
        }
    }
}

initMap();