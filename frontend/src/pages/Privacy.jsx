import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";

function Privacy() {

    return (

        <main className="legal-page">

            <div className="legal-container">


                {/* HEADER */}

                <section className="legal-header">

                    <ShieldCheck size={42} />

                    <span>
                        DJIM'S SHOP
                    </span>

                    <h1>
                        Politique de confidentialité
                    </h1>

                    <p>
                        Cette politique explique comment
                        DJIM'S SHOP collecte, utilise et protège
                        vos informations personnelles.
                    </p>

                </section>


                {/* CONTENT */}

                <article className="legal-content">


                    <section>

                        <h2>
                            1. Informations collectées
                        </h2>

                        <p>
                            Nous pouvons collecter certaines informations
                            nécessaires au fonctionnement de votre compte
                            et au traitement de vos commandes.
                        </p>

                        <ul>

                            <li>Nom utilisateur</li>

                            <li>Adresse email</li>

                            <li>Numéro de téléphone</li>

                            <li>Adresse de livraison</li>

                            <li>
                                Informations relatives aux commandes
                            </li>

                        </ul>

                    </section>


                    <section>

                        <h2>
                            2. Utilisation des informations
                        </h2>

                        <p>
                            Les informations collectées peuvent être utilisées
                            pour gérer votre compte, traiter vos commandes,
                            assurer la livraison et améliorer nos services.
                        </p>

                    </section>


                    <section>

                        <h2>
                            3. Protection des données
                        </h2>

                        <p>
                            DJIM'S SHOP met en place des mesures techniques
                            et organisationnelles raisonnables afin de protéger
                            les informations personnelles contre tout accès,
                            modification ou divulgation non autorisés.
                        </p>

                    </section>


                    <section>

                        <h2>
                            4. Partage des informations
                        </h2>

                        <p>
                            Vos informations personnelles ne sont pas vendues
                            à des tiers.
                        </p>

                        <p>
                            Certaines informations peuvent toutefois être
                            communiquées aux prestataires nécessaires à
                            l'exécution de votre commande, notamment pour
                            la livraison ou le paiement.
                        </p>

                    </section>


                    <section>

                        <h2>
                            5. Cookies
                        </h2>

                        <p>
                            DJIM'S SHOP peut utiliser des cookies ou des
                            technologies similaires afin d'améliorer votre
                            expérience et d'assurer certaines fonctionnalités
                            de la plateforme.
                        </p>

                    </section>


                    <section>

                        <h2>
                            6. Conservation des données
                        </h2>

                        <p>
                            Les informations personnelles sont conservées
                            pendant la durée nécessaire au fonctionnement
                            du service, au traitement des commandes et au
                            respect des obligations applicables.
                        </p>

                    </section>


                    <section>

                        <h2>
                            7. Vos droits
                        </h2>

                        <p>
                            Vous pouvez demander la consultation, la correction
                            ou la mise à jour de vos informations personnelles,
                            sous réserve des obligations légales applicables.
                        </p>

                    </section>


                    <section>

                        <h2>
                            8. Modification de cette politique
                        </h2>

                        <p>
                            Cette politique de confidentialité peut être
                            modifiée afin de tenir compte des évolutions
                            de nos services et de nos pratiques.
                        </p>

                    </section>


                    <section className="legal-contact">

                        <h2>
                            Nous contacter
                        </h2>

                        <p>
                            Pour toute question concernant la protection
                            de vos données personnelles, contactez-nous.
                        </p>

                        <Link
                            to="/contact"
                            className="legal-contact-button"
                        >
                            Contacter DJIM'S SHOP
                        </Link>

                    </section>

                </article>


                <Link
                    to="/"
                    className="legal-back"
                >

                    <ArrowLeft size={18} />

                    Retour à l'accueil

                </Link>

            </div>

        </main>

    );
}

export default Privacy;