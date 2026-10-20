
const questions = [
    {
        numero: 1,
        reponsesCorrectes: ["HTML", "CSS", "JavaScript"]
    },
    {
        numero: 2,
        reponsesCorrectes: ["string", "number", "boolean"]
    },
    {
        numero: 3,
        reponsesCorrectes: ["forEach", "map", "filter"]
    },
    {
        numero: 4,
        reponsesCorrectes: ["getElementById"]
    },
    {
        numero: 5,
        reponsesCorrectes: ["JavaScript"]
    }
];

const initialiser = document.getElementById("initialiser");
const boutonCorrige = document.getElementById("corrige");
const boutonResultat = document.getElementById("resultat");

// 1. Initialiser le QCM
initialiser.addEventListener("click", function () {
    document.querySelectorAll("#qcm input").forEach(function (input) {
        input.checked = false;
    });
});

// 2. Vérifier une question
function corrigerQuestion(question) {
    const selectionnes = document.querySelectorAll(
        'input[name="q' + question.numero + '"]:checked'
    );

    const reponsesUtilisateur = Array.from(selectionnes).map(function (input) {
        return input.value;
    });

    const bonnesReponses = question.reponsesCorrectes;

    if (reponsesUtilisateur.length !== bonnesReponses.length) {
        return false;
    }

    return bonnesReponses.every(function (reponse) {
        return reponsesUtilisateur.includes(reponse);
    });
}

// Fonction qui ouvre une nouvelle fenêtre
function ouvrirFenetre(titre, contenu) {
    const fenetre = window.open("", "_blank", "width=650,height=650");

    if (!fenetre) {
        alert("Autorisez les fenêtres pop-up dans votre navigateur.");
        return null;
    }

    fenetre.document.open();
    fenetre.document.write(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>${titre}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 25px;
                    line-height: 1.6;
                }
                .correcte {
                    color: green;
                    text-decoration: underline;
                    font-weight: bold;
                }
                .correct {
                    color: green;
                }
                .incorrect {
                    color: red;
                }
            </style>
        </head>
        <body>
            ${contenu}
        </body>
        </html>
    `);
    fenetre.document.close();

    return fenetre;
}

// 3. Afficher le corrigé
boutonCorrige.addEventListener("click", function () {
    let contenu = "<h1>Corrigé du QCM</h1>";

    questions.forEach(function (question) {
        contenu += "<h3>Question " + question.numero + "</h3>";

        const reponses = document.querySelectorAll(
            'input[name="q' + question.numero + '"]'
        );

        reponses.forEach(function (input) {
            if (question.reponsesCorrectes.includes(input.value)) {
                contenu += '<p class="correcte">' + input.value + "</p>";
            } else {
                contenu += "<p>" + input.value + "</p>";
            }
        });
    });

    ouvrirFenetre("Corrigé du QCM", contenu);
});

// 4. Afficher le résultat
boutonResultat.addEventListener("click", function () {
    let contenu = "<h1>Résultat du test</h1>";
    let score = 0;

    questions.forEach(function (question) {
        const correcte = corrigerQuestion(question);

        if (correcte) {
            score++;

            contenu +=
                '<p class="correct">La réponse de la question ' +
                question.numero + " est correcte.</p>";
        } else {
            contenu +=
                '<p class="incorrect">La réponse de la question ' +
                question.numero + " est incorrecte.</p>";
        }
    });

    contenu += "<h2>Score : " + score + " / " + questions.length + "</h2>";

    ouvrirFenetre("Résultat du QCM", contenu);
});
