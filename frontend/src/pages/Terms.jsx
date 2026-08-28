import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";

function Terms() {

    return (

        <main className="legal-page">

            <div className="legal-container">


                {/* HEADER */}

                <section className="legal-header">

                    <FileText size={42} />

                    <span>
                        DJIM'S SHOP
                    </span>

                    <h1>
                        Conditions Générales
                    </h1>

                    <p>
                        Les présentes conditions définissent
                        les règles d'utilisation de notre plateforme
                        et les conditions applicables aux achats.
                    </p>

                </section>


                {/* CONTENT */}

                <article className="legal-content">


                    {/* ARTICLE 1 */}

                    <section>

                        <h2>
                            1. Objet
                        </h2>

                        <p>
                            Les présentes Conditions Générales ont pour objet
                            de définir les modalités d'utilisation du site
                            DJIM'S SHOP ainsi que les conditions applicables
                            à l'achat de produits proposés sur notre plateforme.
                        </p>

                    </section>


                    {/* ARTICLE 2 */}

                    <section>

                        <h2>
                            2. Acceptation des conditions
                        </h2>

                        <p>
                            En utilisant DJIM'S SHOP ou en effectuant une
                            commande, vous acceptez les présentes Conditions
                            Générales.
                        </p>

                        <p>
                            Si vous n'acceptez pas ces conditions, veuillez
                            ne pas utiliser notre plateforme.
                        </p>

                    </section>


                    {/* ARTICLE 3 */}

                    <section>

                        <h2>
                            3. Compte utilisateur
                        </h2>

                        <p>
                            Certaines fonctionnalités nécessitent la création
                            d'un compte utilisateur.
                        </p>

                        <ul>

                            <li>
                                Vous devez fournir des informations exactes.
                            </li>

                            <li>
                                Vous êtes responsable de la confidentialité
                                de vos identifiants.
                            </li>

                            <li>
                                Toute activité réalisée depuis votre compte
                                relève de votre responsabilité.
                            </li>

                        </ul>

                    </section>


                    {/* ARTICLE 4 */}

                    <section>

                        <h2>
                            4. Produits et disponibilité
                        </h2>

                        <p>
                            Les produits proposés sur DJIM'S SHOP sont présentés
                            avec leurs caractéristiques et leurs prix.
                        </p>

                        <p>
                            La disponibilité des produits dépend du stock.
                            Un produit peut être retiré ou devenir indisponible
                            sans préavis.
                        </p>

                    </section>


                    {/* ARTICLE 5 */}

                    <section>

                        <h2>
                            5. Commandes
                        </h2>

                        <p>
                            Une commande est considérée comme enregistrée
                            après validation des informations nécessaires
                            et confirmation selon le processus proposé
                            par la plateforme.
                        </p>

                        <p>
                            DJIM'S SHOP se réserve le droit de refuser ou
                            d'annuler une commande en cas d'erreur,
                            d'indisponibilité ou de suspicion de fraude.
                        </p>

                    </section>


                    {/* ARTICLE 6 */}

                    <section>

                        <h2>
                            6. Prix et paiement
                        </h2>

                        <p>
                            Les prix affichés sont exprimés en Franc CFA (FCFA),
                            sauf indication contraire.
                        </p>

                        <p>
                            Les moyens de paiement disponibles sont affichés
                            lors de la validation de la commande.
                        </p>

                    </section>


                    {/* ARTICLE 7 */}

                    <section>

                        <h2>
                            7. Livraison
                        </h2>

                        <p>
                            Les modalités, zones et délais de livraison sont
                            communiqués lors du processus de commande.
                        </p>

                        <p>
                            Les délais peuvent varier selon la disponibilité
                            des produits et la localisation du client.
                        </p>

                    </section>


                    {/* ARTICLE 8 */}

                    <section>

                        <h2>
                            8. Annulation et retour
                        </h2>

                        <p>
                            Les demandes d'annulation ou de retour sont
                            examinées conformément aux conditions applicables
                            au produit et à la commande concernée.
                        </p>

                        <p>
                            Pour toute demande, le client peut contacter
                            le service client de DJIM'S SHOP.
                        </p>

                    </section>


                    {/* ARTICLE 9 */}

                    <section>

                        <h2>
                            9. Responsabilité
                        </h2>

                        <p>
                            DJIM'S SHOP s'efforce de fournir des informations
                            exactes et de maintenir la disponibilité de la
                            plateforme.
                        </p>

                        <p>
                            Toutefois, nous ne pouvons garantir une absence
                            totale d'erreurs techniques, d'interruptions
                            temporaires ou d'indisponibilités.
                        </p>

                    </section>


                    {/* ARTICLE 10 */}

                    <section>

                        <h2>
                            10. Modification des conditions
                        </h2>

                        <p>
                            DJIM'S SHOP peut modifier les présentes Conditions
                            Générales à tout moment afin de les adapter aux
                            évolutions du service.
                        </p>

                    </section>


                    {/* CONTACT */}

                    <section className="legal-contact">

                        <h2>
                            Une question ?
                        </h2>

                        <p>
                            Pour toute question concernant ces conditions,
                            contactez-nous.
                        </p>

                        <Link
                            to="/contact"
                            className="legal-contact-button"
                        >
                            Nous contacter
                        </Link>

                    </section>

                </article>


                {/* BACK */}

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

export default Terms;