let div = document.querySelectorAll(".panel");
let boutons = document.querySelectorAll("nav button");

function openDiv(i) {
    boutons[i+1].classList.toggle("focus-btn");
    boutons.forEach(unBouton => {
        if (unBouton != boutons[i+1]) {
            unBouton.classList.remove("focus-btn");
        }
    });
    if (!boutons[i+1].classList.contains("focus-btn")) {
        boutons[0].classList.add("focus-btn");
    }
    div[i].classList.toggle("open-div");
    div.forEach(uneDiv => {
        if (uneDiv != div[i]) {
            uneDiv.classList.remove("open-div");
        }
    });
}

function closeDiv() {
    boutons[0].classList.add("focus-btn");
    boutons.forEach(unBouton => {
        if (unBouton != boutons[0])
        unBouton.classList.remove("focus-btn");
    });
    div.forEach(uneDiv => {
        uneDiv.classList.remove("open-div");
    });
}