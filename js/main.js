/*** VARIABLES ***/

// QuerySelectors
let imgFont = document.querySelector(".bg-img");
let div = document.querySelectorAll(".panel");
let boutons = document.querySelectorAll("nav button");
let imgRonde = document.querySelector(".container-img img");
let play = document.querySelector(".play");
let playIcone = document.querySelector(".play i");
let progress = document.querySelector(".progress-bar");
let playList = document.querySelector("aside ul");
let musiques;

// Audio
let json = [{
        "src": "0",
        "artiste": "alt-j",
        "title": "Breezeblocks",
        "img": "album-alt-j"
    },
    {
        "src": "1",
        "artiste": "bbno$ & y2k",
        "title": "lalala",
        "img": "lalala"
    },
    {
        "src": "2",
        "artiste": "Neil young",
        "title": "Old Man",
        "img": "harvest-neil-young"
    }
]
let time;
let idPlayList = 0;
let source = 0;
let sound = new Howl({
    src: ["sound/" + json[source].title + ".mp3"],
    volume: 0.5,
    preload: true,
    onend: () => {
        animImageRonde(false);
        playIcone.classList.toggle("fa-pause");
        playIcone.classList.toggle("fa-play");
    }
});

/*** FONCTIONS ***/

/*
@param tourne: boolean pour savoir si elle tourne ou elle se met sur pause.
*/
function animImageRonde(tourne) {
    if (tourne) {
        imgRonde.classList.add("anim-img-ronde");
        imgRonde.classList.remove("anim-img-ronde-p");
    } else {
        imgRonde.classList.add("anim-img-ronde-p");
    }

}



/*** PROGRAMME ***/

//Génération de la playlist
window.onload = () => {
    progress.value = 0;
    json.forEach(element => {
        musiquesCreates = document.createElement("li");
        musiquesCreates.setAttribute("data-value", element.src);
        musiquesCreates.innerHTML = '<span class="maj">' + element.artiste + "</span><br>" + element.title;
        playList.appendChild(musiquesCreates);
        musiques = document.querySelectorAll("aside li");
    });
    // selection de musique depuis l'aside playlist
    sound.once('load', function () {
        musiques.forEach(musique => {
            musique.addEventListener("click", () => {
                source = parseInt(musique.getAttribute("data-value"));
                playIcone.classList.add("fa-pause");
                playIcone.classList.remove("fa-play");
                imgFont.style.backgroundImage = 'url(./image/' + json[source].img + '.jpg)';
                imgRonde.setAttribute("src", './image/' + json[source].img + '.jpg');
                imgFont.classList.remove("bg-img-t");
                imgRonde.classList.remove("img-t");
                setTimeout(() => {
                    imgFont.classList.add("bg-img-t");
                    imgRonde.classList.add("img-t");
                    animImageRonde(true);
                }, 30);
                sound.stop();
                sound = new Howl({
                    src: ["sound/" + json[source].title + ".mp3"],
                    volume: 0.5,
                    preload: true,
                    onend: () => {
                        animImageRonde(false);
                        playIcone.classList.toggle("fa-pause");
                        playIcone.classList.toggle("fa-play");
                    }
                });
                sound.play();

            });
        });
    });
    // barre de progression
    progress.oninput = function() {
        console.log(progress.value);
        
        this.style.background = 'linear-gradient(to right, #FF4DBE 0%, #FF4DBE ' + this.value + '%, #fff ' + this.value + '%, white 100%)'
    };

};

/* ANIMATIONS */

// affiche un paneau du menu et colore le bouton
function openDiv(i) {
    boutons[i + 1].classList.toggle("focus-btn");
    boutons.forEach(unBouton => {
        if (unBouton != boutons[i + 1]) {
            unBouton.classList.remove("focus-btn");
        }
    });
    if (!boutons[i + 1].classList.contains("focus-btn")) {
        boutons[0].classList.add("focus-btn");
    }
    div[i].classList.toggle("open-div");
    div.forEach(uneDiv => {
        if (uneDiv != div[i]) {
            uneDiv.classList.remove("open-div");
        }
    });
}

// ferme le panneau ouver quand un clique sur lecture en cours
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

/* FONCTIONNALITEES PLAYER AUDIO */



// bouton play/pause
sound.once('load', function () {
    play.addEventListener("click", () => {
        playIcone.classList.toggle("fa-pause");
        playIcone.classList.toggle("fa-play");
        if (sound.playing()) {
            animImageRonde(false);
            time = sound.seek();
            sound.stop();
        } else {
            imgFont.style.backgroundImage = 'url(./image/' + json[source].img + '.jpg)';
            imgRonde.setAttribute("src", './image/' + json[source].img + '.jpg');
            imgFont.classList.add("bg-img-t");
            imgRonde.classList.add("img-t");
            animImageRonde(true);
            sound.seek(time);
            sound.play();
        }
    });
});

sound.on('end', function () {

});