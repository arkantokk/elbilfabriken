const button =document.getElementById("test1")
const button2 =document.getElementById("test2")
const button3 =document.getElementById("test3")
const button4 =document.getElementById("test4")
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
button4.addEventListener("click", () => {
    choice1=button3;
});

const resultbtn = document.getElementById("resultsbutton")

resultbtn.addEventListener("click", () => {
var liste_over_valg=[]
liste_over_valg.push(choice1)
var results = get_results(liste_over_valg)
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
        textcontent += `you killed ${3000*size} rabbits with your factory :( `
        utslipp +=100
    }
        if (liste[0]==button2)
    {
        liste_over_results.push(`you killed ${8000*size} rabbits with your factory :( `)
        textcontent += "You killed 8000 rabbits with your factory :( "
        utslipp+= 200
        fabrikkpris += 200000
    }
        if (liste[0]==button3)
    {
        liste_over_results.push(`you killed ${100*size} rabbits with your factory :( `)
        textcontent += "You killed 100 rabbits with your factory :( "
        utslipp +=10
    }
    
    selector1=document.getElementById("selector")
    textcontent += selector1.value
    liste_over_results.push(selector1.value)

    textcontent += `and kost you ${fabrikkpris}kr` //vet ikke hvor viktig det er å inkludere pris? men inkluderte slik at vi har muligheten
    textcontent += ` and your factory put out ${utslipp} ton CO2 per year`
    liste_over_results.push(`and kost you ${fabrikkpris}kr`)
    if (utslipp < gjennomsnittsutslipp) 
    {
        utslippmin=gjennomsnittsutslipp-utslipp
        liste_over_results.push(` and your factory put out ${utslipp} ton CO2 per year` + ` thats ${utslippmin} ton less than the average factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`)
        textcontent += ` thats ${utslippmin} ton less than the average factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`
    }
    else
    {
        liste_over_results.push(` and your factory put out ${utslipp} ton CO2 per year` + ` thats ${utslippmin} ton less than the average factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`)
    }
    text.textContent = textcontent
    return liste_over_results
}
document.addEventListener("DOMContentLoaded", () => {
const text2=document.getElementById("textcontent1")
text1.textContent =results[0]
const text2=document.getElementById("textcontent2")
text2.textContent =results[1]
const text3=document.getElementById("textcontent3")
text3.textContent =results[3] })
