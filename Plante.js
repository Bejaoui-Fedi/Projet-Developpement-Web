document.addEventListener("DOMContentLoaded", () => {
    // Gestion du carrousel : Pause au survol et reprise
    const carousel = document.querySelector("#carouselExample");

    if (carousel) {
        carousel.addEventListener("mouseover", () => {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            carouselInstance.pause();
        });

        carousel.addEventListener("mouseout", () => {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            carouselInstance.cycle();
        });
    }

    // Gestion du formulaire de diagnostic
    const formulaire = document.querySelector("form");
    if (formulaire) {
        const planteInput = document.getElementById("plante");
        const organeInput = document.getElementById("organe");
        const resultatDiv = document.createElement("div"); // Conteneur dynamique des résultats
        resultatDiv.classList.add("mt-4", "alert");
        formulaire.appendChild(resultatDiv); // Ajout dynamique au formulaire

        // Données des maladies et solutions
        const maladies = {
            ble: {
                grain: { maladie: "Maladie charbonneuse", solution: "Rotation des cultures et traitement des semences." },
                epi: { maladie: "Charbon du blé", solution: "Désinfection des semences avec fongicide systémique." },
                tige: { maladie: "Piétins", solution: "Rotation des cultures et traitements des semences." },
            },
            orge: {
                epi: { maladie: "Charbon nu de l’orge", solution: "Désinfection des semences avec fongicide systémique." },
                tige: { maladie: "Piétins", solution: "Rotation des cultures et traitements des semences." },
            },
            avoine: {
                panicule: { maladie: "Charbon nu de l’avoine", solution: "Rotation des cultures et traitement des semences." },
            },
        };

        // Fonction de diagnostic
        function diagnostiquer(event) {
            event.preventDefault(); // Empêche le rechargement de la page
            const plante = planteInput.value;
            const organe = organeInput.value;

            // Vérification des entrées
            if (!plante || !organe) {
                afficherMessage("Veuillez sélectionner une plante et un organe affecté.", "alert-danger");
                return;
            }

            // Recherche de la maladie
            const diagnostic = maladies[plante]?.[organe];

            if (diagnostic) {
                afficherResultat(diagnostic.maladie, diagnostic.solution);
            } else {
                afficherMessage("Aucune maladie connue pour cette combinaison.", "alert-warning");
            }
        }

        // Fonction pour afficher les résultats
        function afficherResultat(maladie, solution) {
            resultatDiv.classList.remove("alert-danger", "alert-warning");
            resultatDiv.classList.add("alert-success");
            resultatDiv.innerHTML = `
                <h4 class="alert-heading">Diagnostic Réussi</h4>
                <p><strong>Maladie :</strong> ${maladie}</p>
                <p><strong>Solution :</strong> ${solution}</p>
            `;
        }

        // Fonction pour afficher un message d'erreur ou d'avertissement
        function afficherMessage(message, alertType) {
            resultatDiv.classList.remove("alert-success", "alert-warning");
            resultatDiv.classList.add(alertType);
            resultatDiv.innerHTML = message;
        }

        // Liaison de la fonction au bouton de soumission
        formulaire.addEventListener("submit", diagnostiquer);
    }

    // Formulaire de Contact
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Empêche le rechargement de la page

            // Récupération des valeurs des champs
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Vérification que tous les champs sont remplis
            if (nom && email && message) {
                // Simulation de l'envoi des données (ici, on montre simplement un message de succès)
                formMessage.innerHTML = `
                    <div class="alert alert-success">
                        <strong>Merci !</strong> Votre message a bien été envoyé.
                    </div>
                `;

                // Réinitialisation du formulaire
                contactForm.reset();
            } else {
                // Si un champ est manquant, afficher un message d'erreur
                formMessage.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>Erreur!</strong> Veuillez remplir tous les champs.
                    </div>
                `;
            }
        });
    }
});

