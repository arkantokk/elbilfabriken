const button = document.getElementById("by")
const button2 = document.getElementById("mountain")
const button3 = document.getElementById("forest")
const button4 = document.getElementById("river")
const submitButton = document.getElementById("submit_btn") // button that will calculate
var choice1;


var gjennomsnittsutslipp = 2420000;

button.addEventListener("click", () => {
    choice1 = button;
    button4.classList.remove("active");
    button2.classList.remove("active");
    button3.classList.remove("active");
    button.classList.add("active");
});
button2.addEventListener("click", () => {
    choice1 = button2;
    button.classList.remove("active");
    button4.classList.remove("active");
    button3.classList.remove("active");
    button2.classList.add("active");
});
button3.addEventListener("click", () => {
    choice1 = button3;
    button.classList.remove("active");
    button2.classList.remove("active");
    button4.classList.remove("active");
    button3.classList.add("active");
});
button4.addEventListener("click", () => {
    choice1 = button4;
    button.classList.remove("active");
    button2.classList.remove("active");
    button3.classList.remove("active");
    button4.classList.add("active");
});


const resultbtn = document.getElementById("resultsbutton")

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    var liste_over_valg = []
    liste_over_valg.push(choice1)
    var results = get_results(liste_over_valg)
    //var images = get_images(liste_over_valg)
    
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.classList.add("active");

    localStorage.setItem("factoryResults", JSON.stringify(results[0]))
    localStorage.setItem("images", JSON.stringify(results[1]))
    localStorage.setItem("emissions", JSON.stringify(results[2]))
    window.location.href = "results.html"
});

function get_results(liste) {
    var utslipp = 0
    var fabrikkpris = 0
    var text = document.getElementById("resultsinfo")
    var liste_over_results = []
    var img_list = []
    var label = document.getElementById("size")
    var size = parseInt(label.value)
    if (liste[0] == button) {
        liste_over_results.push(`Building a factory next to a city acts as a catalyst for both economic development and environmental/social disruption. It creates jobs, lowers commuting times, and increases tax revenue, but it often brings pollution, traffic congestion, and lower quality of life to nearby residential areas.
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
 `)
        img_list.push("/assets/by.jpg")
        //utslipp += 100
        //fabrikkpris += 100000
    }
    if (liste[0] == button2) {
        liste_over_results.push(`Building a factory in or on a mountain presents unique engineering challenges, high logistical costs, and significant environmental considerations, but it can offer benefits such as natural security, stable temperatures, and high-profit margins due to specialized production.

\nDownsides:
\n•	High logistics costs
\n•	Significant environmental considerations
\nBenefits:
\n•	Natural security
\n•	Stable temperature
\n•	Specialized production
`)
        img_list.push("/assets/mountain.jpg") //change
        //utslipp += 200
        //fabrikkpris += 200000
    }
    if (liste[0] == button3) {
        liste_over_results.push(`
Building a factory in a forest initiates significant, long-term changes to the local ecosystem, ranging from habitat destruction to altered air and water quality. While conventional construction typically damages these environments, modern "factory-as-a-forest" approaches aim to blend industrial activity with ecological restoration. 
\nDownsides:
\n•	Long-term changes to the local ecosystem, including: Habitat destruction and Altered air and water quality
\n•	Modern "factory-as-a-forest" approaches aim to blend industrial activity with ecological restoration
\nBenefits: 
\n•	The trees in the surrounding forest absorb a portion of the factory's CO2 emissions. Through photosynthesis
`)
        img_list.push("/assets/forest.jpg")
        //utslipp += 10
        //fabrikkpris += 50000
    }
    if (liste[0] == button4) {
        liste_over_results.push(`Building a factory in a river valley generally serves logistical and operational needs—such as water access and transport—but frequently leads to significant environmental degradation, increased pollution, and higher risks of flooding for surrounding areas. While it can bring economic growth and jobs, these benefits are often overshadowed by long-term damage to ecosystems and public health.
\nDownsides:
\n•	Logistical and operational needs, including: Water access and Transport
\n•	Significant environmental degradation
\n•	Increased pollution
\n•	Higher risks of flooding the surrounding areas
\n•	Long-term damage to ecosystems and public health
\n•	CO2 emissions from a factory in a river valley tend to become trapped near the ground due to the surrounding topography, which restricts horizontal wind dispersion. This creates localized high-concentration areas, especially during temperature inversions where cool, dense air (carrying the CO2) is capped by warmer air above. 
\nBenefits:
\n•	Economic growth and jobs
`)
        img_list.push("/assets/river.jpg")
        //utslipp += 10
        //fabrikkpris += 50000
    }

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
        liste_over_results.push("Electric car factories (OEMs) get their supplies from a complex, global, multi-tiered supply chain that begins with mining and ends with battery assembly, heavily dominated by manufacturers in China, Japan, and South Korea. The supply chain is structured into three main stages: upstream (raw materials), midstream (refining and components), and downstream (assembly)." + "you answered Norway, but we havent filled in this text yet")
        //utslipp += 10*size
        //fabrikkpris += 2500*size
        img_list.push("/assets/Norway.png")
    }
    else if (selector3.value == "Germany")
    {
        liste_over_results.push("Electric car factories (OEMs) get their supplies from a complex, global, multi-tiered supply chain that begins with mining and ends with battery assembly, heavily dominated by manufacturers in China, Japan, and South Korea. The supply chain is structured into three main stages: upstream (raw materials), midstream (refining and components), and downstream (assembly)." + "you answered Germany, but we havent filled in this text yet")
        //utslipp += 1*size
        //fabrikkpris += 250*size
        img_list.push("/assets/Germany.jpg")
    }
    else if (selector3.value == "Brazil")
    {
        liste_over_results.push("Electric car factories (OEMs) get their supplies from a complex, global, multi-tiered supply chain that begins with mining and ends with battery assembly, heavily dominated by manufacturers in China, Japan, and South Korea. The supply chain is structured into three main stages: upstream (raw materials), midstream (refining and components), and downstream (assembly)." + "you answered Brazil, but we havent filled in this text yet")
        //utslipp += 1*size
        //fabrikkpris += 250*size
        img_list.push("/assets/Brazil.jpg")
    }


    if (size < 2500){
        liste_over_results.push(`Having a small-sized factory—often defined as a micro-factory or small-scale manufacturing unit—presents a mix of strategic advantages and operational constraints. Small factories often benefit from high flexibility and lower overhead, but they face limitations in production capacity, efficiency, and resource access.`)
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
            liste_over_results.push(`A large-scale factory significantly boosts production, increases efficiency through specialized labor, and lowers unit costs, but it requires higher operating costs, larger Minimum Order Quantities (MOQs), and creates a more rigid, complex, and slow-moving process`)
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
            liste_over_results.push(`A medium-sized factory (typically defined as having 50–250 employees and 10,000–50,000 square feet) operates as a balance between the agility of a small workshop and the capability of a large plant, acting as a "middle ground" for growth.`)
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
    //liste_over_results.push(`it cost you ${fabrikkpris}kr`) Commented so that we can possibly add it back later, but before now shouldnt be prioritsed
    if (utslipp < gjennomsnittsutslipp) {
        utslippmin = gjennomsnittsutslipp - utslipp
        liste_over_results.push(`Your factory put out ${utslipp} ton CO2 per year, thats ${utslippmin} ton less than the average electric car factory of a similar size, most factories around that size put out ${gjennomsnittsutslipp} ton CO2 per year on average.`)
    }
    else {
        utslippmin = utslipp - gjennomsnittsutslipp
        liste_over_results.push(`Your factory put out ${utslipp} ton CO2 per year, thats ${utslippmin} ton more than the average electric car factory of a similar size, most factories around that size put out ${gjennomsnittsutslipp} ton CO2 per year on average.`)
    }
    var liste3 =[utslipp, gjennomsnittsutslipp]
    var list1og2 = [liste_over_results, img_list, liste3]
    return list1og2
}


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