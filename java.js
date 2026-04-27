const button =document.getElementById("test")
const button2 =document.getElementById("test2")
const button3 =document.getElementById("test3")
var choice1;
const gjennomsnittsutslipp = 150;

button.addEventListener("click", () => {
    choice1=button;
});
button2.addEventListener("click", () => {
    choice1=button2;
});
button3.addEventListener("click", () => {
    choice1=button3;
});


const resultbtn = document.getElementById("resultbutton")

resultbtn.addEventListener("click", () => {
var liste_over_valg=[]
liste_over_valg.push(choice1)
var results = get_results(liste_over_valg)
localStorage.setItem("factoryResults", JSON.stringify(results))
window.location.href = "results.html"
});

function get_results(liste){
    var utslipp = 0
    var fabrikkpris = 0
    var text =document.getElementById("resultsinfo")
    textcontent=""
    var liste_over_results=[]
    var label =document.getElementById("input")
    var size = parseInt(label.value)
    if (liste[0]==button)
    {
        liste_over_results.push(`you killed ${3000*size} rabbits with your factory :( `)
        utslipp +=100
    }
        if (liste[0]==button2)
    {
        liste_over_results.push(`you killed ${8000*size} rabbits with your factory :( `)
        utslipp+= 200
        fabrikkpris += 200000
    }
        if (liste[0]==button3)
    {
        liste_over_results.push(`you killed ${100*size} rabbits with your factory :( `)
        utslipp +=10
    }
    
    let selector1=document.getElementById("kilde")
    liste_over_results.push(selector1.value)

    liste_over_results.push(`and cost you ${fabrikkpris}kr`)
    if (utslipp < gjennomsnittsutslipp) 
    {
        utslippmin=gjennomsnittsutslipp-utslipp
        liste_over_results.push(` and your factory put out ${utslipp} ton CO2 per year` + ` thats ${utslippmin} ton less than the average factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`)
    }
    else
    {
        utslippmin=utslipp-gjennomsnittsutslipp
        liste_over_results.push(` and your factory put out ${utslipp} ton CO2 per year` + ` thats ${utslippmin} ton more than the average factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`)
    }
    return liste_over_results
}

function use_results()
{

    const results = JSON.parse(localStorage.getItem("factoryResults")); 
    if (results)
    {
        const text1=document.getElementById("textcontent1")
        text1.textContent =results[0]
        const text2=document.getElementById("textcontent2")
        text2.textContent =results[1]
        const text3=document.getElementById("textcontent3")
        text3.textContent =results[2] 
    }}