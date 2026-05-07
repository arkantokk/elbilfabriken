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
    const size = document.getElementById("size");
    const luftfiltrasjon = document.getElementById("luftFiltrasjon");
    const avfall = document.getElementById("avfall");
    const kilde = document.getElementById("kilde");
    if (!selectedAreaType) return alert('Please click the map to select a location first.');
    
    
    if (size.value != '' && luftfiltrasjon.value != '' && avfall.value != '' && kilde.value != '')
    {
    const results = generate_factory_data(selectedAreaType);
    localStorage.setItem("factoryResults", JSON.stringify(results[0]));
    localStorage.setItem("images", JSON.stringify(results[1]));
    localStorage.setItem("emissions", JSON.stringify(results[2]))
    window.location.href = "results.html"; }
    else alert("Please fill in the required fields!")
});

function generate_factory_data(areaType) {
    let utslipp = 0;
    let text_list = [];
    let img_list = [];
    const size = parseInt(sizeInput.value) || 0;

    const descriptions = {
        city: [`Building a factory next to a city acts as a catalyst for both economic development and environmental/social disruption. It creates jobs, lowers commuting times, and increases tax revenue, but it often brings pollution, traffic congestion, and lower quality of life to nearby residential areas.
\nDownsides:
\n•	Pollution
\n•	Traffic congestion
\n•	CO2 output from a factory located next to a city directly impacts the local environment and population, contributing to both immediate air quality issues and long-term global climate change. While co2 itself is a colorless, odorless gas, it is usually emitted alongside other pollutants—such as nitrogen oxides (Nox) sulfur dioxide (so2), and particulate matter (PM2.5)—that cause smog, respiratory issues, and cardiovascular problems in surrounding residential areas.
\nBenefits:
\n•	Economic development
\n•	Environmental/social disruption
\n•	It creates jobs
\n•	Lowers commuting times
\n•	Increases tax revenue
 `, "/assets/by.jpg"],
        mountain: [`Building a factory in or on a mountain presents unique engineering challenges, high logistical costs, and significant environmental considerations, but it can offer benefits such as natural security, stable temperatures, and high-profit margins due to specialized production.

\nDownsides:
\n•	High logistics costs
\n•	Significant environmental considerations
\nBenefits:
\n•	Natural security
\n•	Stable temperature
\n•	Specialized production
`, "/assets/mountain.jpg"],
        forest: [`
Building a factory in a forest initiates significant, long-term changes to the local ecosystem, ranging from habitat destruction to altered air and water quality. While conventional construction typically damages these environments, modern "factory-as-a-forest" approaches aim to blend industrial activity with ecological restoration. 
\nDownsides:
\n•	Long-term changes to the local ecosystem, including: Habitat destruction and Altered air and water quality
\n•	Modern "factory-as-a-forest" approaches aim to blend industrial activity with ecological restoration
\nBenefits: 
\n•	The trees in the surrounding forest absorb a portion of the factory's CO2 emissions. Through photosynthesis
`, "/assets/forest.jpg"],
        river: [`Building a factory in a river generally serves logistical and operational needs—such as water access and transport—but frequently leads to significant environmental degradation, increased pollution, and higher risks of flooding for surrounding areas. While it can bring economic growth and jobs, these benefits are often overshadowed by long-term damage to ecosystems and public health.
\nDownsides:
\n•	Logistical and operational needs, including: Water access and Transport
\n•	Significant environmental degradation
\n•	Increased pollution
\n•	Higher risks of flooding the surrounding areas
\n•	Long-term damage to ecosystems and public health
\n•	CO2 emissions from a factory in a river valley tend to become trapped near the ground due to the surrounding topography, which restricts horizontal wind dispersion. This creates localized high-concentration areas, especially during temperature inversions where cool, dense air (carrying the CO2) is capped by warmer air above. 
\nBenefits:
\n•	Economic growth and jobs
`, "/assets/river.jpg"]
    };
    
    text_list.push(descriptions[areaType][0]);
    img_list.push(descriptions[areaType][1]);



    const  selector1 = document.getElementById("luftFiltrasjon")
    if (selector1.value == "yes")
    {
        text_list.push("Installing air filtration in a factory transforms the industrial environment into a healthier, more efficient, and compliant workplace by removing hazardous dust, smoke, oil mists, and fumes. A proper system protects both human health and machinery, leading to fewer breakdowns, higher productivity, and lower operating costs.")

        img_list.push("/assets/airfilter.jpg")
    }
    else if (selector1.value == "no")
    {
        text_list.push("Not having air filtration in a factory leads to severe, long-term consequences that affect employee health, equipment longevity, product quality, and regulatory compliance. Without filtration, industrial environments—which are often 5 to 10 times more polluted than outdoor air—become hazardous environments, leading to accumulated dust, oil mist, and toxic contaminants in the air.")

        img_list.push("/assets/noairfilter.jpg")
    }
    const selector2 = document.getElementById("avfall")
    if (selector2.value == "yes")
    {
        text_list.push("Electric car factories manage waste through a combination of advanced recycling, circular economy practices, and strict water management, aiming to minimize the environmental impact of manufacturing high-voltage batteries and vehicles." +
" Key strategies include managing hazardous waste from battery productions, recycling manufacturing scraps, and increasingly adopting closed-loop systems to reuse materials")
        img_list.push("/assets/waste.jpg")
    }
    else if (selector2.value == "no")
    {
        text_list.push("Failing to implement proper waste management in an electric vehicle (EV) factory causes significant environmental, safety, and regulatory risks, primarily stemming from the toxic components involved in battery manufacturing and electronics. Without appropriate disposal, heavy metals and hazardous chemicals can leach into water sources and soil, creating long-term contamination. ")
        img_list.push("/assets/nowaster.jpg")
    }
    const selector3 = document.getElementById("kilde")
    if (selector3.value == "Norway")
    {
        text_list.push("Electric car factories (OEMs) get their supplies from a complex, global, multi-tiered supply chain that begins with mining and ends with battery assembly, heavily dominated by manufacturers in China, Japan, and South Korea. The supply chain is structured into three main stages: upstream (raw materials), midstream (refining and components), and downstream (assembly). " + "If you were to source resources domestically (from Norway) then that would typically make the raw materials pricier, especially considering what raw materials you can find in Norway. Though the price would increase, the emissions would be much lower than many other options, and cause of the shorter distance travel costs would also decrease.")
        img_list.push("/assets/Norway.png")
    }
    else if (selector3.value == "Germany")
    {
        text_list.push("Electric car factories (OEMs) get their supplies from a complex, global, multi-tiered supply chain that begins with mining and ends with battery assembly, heavily dominated by manufacturers in China, Japan, and South Korea. The supply chain is structured into three main stages: upstream (raw materials), midstream (refining and components), and downstream (assembly). " + "If you were to source resources from Germany, then that would typically make the raw materials, less costly, although not by a very large margin. It would also reduce travel costs and emissions compared to a lot of other places, because of the shorter travel distance.")
        img_list.push("/assets/Germany.jpg")
    }
    else if (selector3.value == "Brazil")
    {
        text_list.push("Electric car factories (OEMs) get their supplies from a complex, global, multi-tiered supply chain that begins with mining and ends with battery assembly, heavily dominated by manufacturers in China, Japan, and South Korea. The supply chain is structured into three main stages: upstream (raw materials), midstream (refining and components), and downstream (assembly). " + "If you were to source resources from Brazil, that would typically make the raw materials cheaper but increase transport cost and distance. The CO2 emissions would also significantly increase cause of the increase in travel distance.")
        img_list.push("/assets/Brazil.jpg")
    }


    if (size < 2500){
        text_list.push(`Having a small-sized factory—often defined as a micro-factory or small-scale manufacturing unit—presents a mix of strategic advantages and operational constraints. Small factories often benefit from high flexibility and lower overhead, but they face limitations in production capacity, efficiency, and resource access.`)
        img_list.push("/assets/by.jpg")
        gjennomsnittsutslipp = 14000
            if (selector3.value == "Norway")
            {
                utslipp += 120
            }
            else if (selector3.value == "Germany")
            {
                utslipp += 168
            }
            else if (selector3.value == "Brazil")
            {
                utslipp += 780
            }
    }
    else if (size > 2500){
        if (size > 10000){
            text_list.push(`A large-scale factory significantly boosts production, increases efficiency through specialized labor, and lowers unit costs, but it requires higher operating costs, larger Minimum Order Quantities (MOQs), and creates a more rigid, complex, and slow-moving process.`)
            img_list.push("/assets/by.jpg")
            gjennomsnittsutslipp = 100000
            if (selector3.value == "Norway")
            {
                utslipp += 1200
            }
            else if (selector3.value == "Germany")
            {
                utslipp += 1680
            }
            else if (selector3.value == "Brazil")
            {
                utslipp += 7800
            }
        }
        else {
            text_list.push(`A medium-sized factory (typically defined as having 50–250 employees and 10,000–50,000 square feet) operates as a balance between the agility of a small workshop and the capability of a large plant, acting as a "middle ground" for growth.`)
            img_list.push("/assets/by.jpg")
            gjennomsnittsutslipp = 50000
            if (selector3.value == "Norway")
            {
                utslipp += 480
            }
            else if (selector3.value == "Germany")
            {
                utslipp += 672
            }
            else if (selector3.value == "Brazil")
            {
                utslipp += 3120
            }
        }
        
    }
    utslipp += size*6 //yearly emissions per square meter, by taking avergae car produced per m^2 multiplied by 10 for the emission per prodcution
    utslipp += size*0.2 //yearly emissions per swaure meter for stuff like heating, osv...
    utslipp = Math.round(utslipp)
    let utslippmin = 0;
    if (utslipp < gjennomsnittsutslipp) {
        utslippmin = gjennomsnittsutslipp - utslipp
        text_list.push(`Your factory put out ${utslipp} ton CO2 per year, thats ${utslippmin} ton less than the average electric car factory of a similar size, most factories around that size put out ${gjennomsnittsutslipp} ton CO2 per year on average.`)
    }
    else {
        utslippmin = utslipp - gjennomsnittsutslipp
        text_list.push(`Your factory put out ${utslipp} ton CO2 per year, thats ${utslippmin} ton more than the average electric car factory of a similar size, most factories around that size put out ${gjennomsnittsutslipp} ton CO2 per year on average.`)
    }
    var liste3 =[utslipp, gjennomsnittsutslipp]
    var list1og2og3 = [text_list, img_list, liste3]
    return list1og2og3
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
