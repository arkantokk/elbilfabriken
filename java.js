const button =document.getElementById("test")
const button2 =document.getElementById("test2")
const button3 =document.getElementById("test3")
var choice1;

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
    var text =document.getElementById("resultsinfo")
    textcontent=""
    if (liste[0]==button)
    {
        text.textContent =+ "Du drepte 3000 kaniner med fabrikken din :("
    }
        if (liste[0]==button2)
    {
        text.textContent = "Du drepte 8000 kaniner med fabrikken din :("
    }
            if (liste[0]==button3)
    {
        text.textContent = "Du drepte 100 kaniner med fabrikken din :("
    }

}