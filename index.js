const button = document.getElementById("by")
const button2 = document.getElementById("mountain")
const button3 = document.getElementById("forest")
const submitButton = document.getElementById("submit_btn") // button that will calculate
var choice1;


const gjennomsnittsutslipp = 150;

button.addEventListener("click", () => {
    choice1 = button;
    button.classList.remove("active");
    button2.classList.remove("active");
    button3.classList.remove("active");
    button.classList.add("active");
});
button2.addEventListener("click", () => {
    choice1 = button2;
    button.classList.remove("active");
    button2.classList.remove("active");
    button3.classList.remove("active");
    button2.classList.add("active");
});
button3.addEventListener("click", () => {
    choice1 = button3;
    button.classList.remove("active");
    button2.classList.remove("active");
    button3.classList.remove("active");
    button3.classList.add("active");
});


const resultbtn = document.getElementById("resultsbutton")

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    var liste_over_valg = []
    liste_over_valg.push(choice1)
    var results = get_results(liste_over_valg)
    localStorage.setItem("factoryResults", JSON.stringify(results));
    
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.classList.add("active");

});

function get_results(liste) {
    var utslipp = 0
    var fabrikkpris = 0
    var text = document.getElementById("resultsinfo")
    textcontent = ""
    var liste_over_results = []
    var label = document.getElementById("size")
    var size = parseInt(label.value)
    if (liste[0] == button) {
        liste_over_results.push(`you killed ${3000 * size} rabbits with your factory :( `)
        textcontent += `you killed ${3000 * size} rabbits with your factory :( `
        utslipp += 100
        fabrikkpris += 100000
    }
    if (liste[0] == button2) {
        liste_over_results.push(`you killed ${8000 * size} rabbits with your factory :( `)
        textcontent += "You killed 8000 rabbits with your factory :( "
        utslipp += 200
        fabrikkpris += 200000
    }
    if (liste[0] == button3) {
        liste_over_results.push(`you killed ${100 * size} rabbits with your factory :( `)
        textcontent += "You killed 100 rabbits with your factory :( "
        utslipp += 10
        fabrikkpris += 50000
    }

    selector1 = document.getElementById("results-container")
    // textcontent += selector1.value it creates bug 
    liste_over_results.push(selector1.value)

    textcontent += ` and cost you ${fabrikkpris}kr` //vet ikke hvor viktig det er å inkludere pris? men inkluderte slik at vi har muligheten
    textcontent += ` and your factory put out ${utslipp} ton CO2 per year`
    liste_over_results.push(`and cost you ${fabrikkpris}kr`)
    if (utslipp < gjennomsnittsutslipp) {
        utslippmin = gjennomsnittsutslipp - utslipp
        liste_over_results.push(` and your factory put out ${utslipp} ton CO2 per year` + ` thats ${utslippmin} ton less than the average factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`)
        textcontent += ` thats ${utslippmin} ton less than the average factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`
    }
    else {
        utslippmin = utslipp - gjennomsnittsutslipp
        liste_over_results.push(` and your factory put out ${utslipp} ton CO2 per year` + ` thats ${utslippmin} ton more than the average factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`)
    }
    text.textContent = textcontent
    return liste_over_results
}


