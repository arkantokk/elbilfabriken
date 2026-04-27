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
get_results(liste_over_valg)
});

function get_results(liste){
    var utslipp = 0
    var fabrikkpris = 0
    var text =document.getElementById("resultsinfo")
    textcontent=""
    var label =document.getElementById("input")
    var size = parseInt(label.value)
    if (liste[0]==button)
    {
        textcontent += `you killed ${3000*size} rabbits with yor factory :( `
        utslipp +=100
    }
        if (liste[0]==button2)
    {
        textcontent += "You killed 8000 rabbits with yor factory :( "
        utslipp+= 200
        fabrikkpris += 200000
    }
        if (liste[0]==button3)
    {
        textcontent += "You killed 100 rabbits with yor factory :( "
        utslipp +=10
    }
    selector1=document.getElementById("selector")
    textcontent += selector1.value
    
    textcontent += `and kost you ${fabrikkpris}kr` //vet ikke hvor viktig det er å inkludere pris? men inkluderte slik at vi har muligheten
    textcontent += ` and your factory put out ${utslipp} ton CO2 per year`
    if (utslipp < gjennomsnittsutslipp) 
    {
        utslippmin=gjennomsnittsutslipp-utslipp
        textcontent += ` thats ${utslippmin} ton less than the average factory, most factories put out ${gjennomsnittsutslipp} ton CO2 per year...`
    }

    text.textContent = textcontent
}