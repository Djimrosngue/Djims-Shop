import { Link } from "react-router-dom";
function Footer() {

    const handleNewsletter = (e) => {
        e.preventDefault();

        const email = e.target.email.value;

        if (email) {
            alert("Merci ! Vous êtes inscrit à notre newsletter.");
            e.target.reset();
        }
    };

    return (
        <footer className="shop-footer">

            {/* =========================
                NEWSLETTER
            ========================= */}

            <section className="footer-newsletter">

                <div className="footer-container newsletter-content">

                    <div>

                        <span className="newsletter-label">
                            NEWSLETTER
                        </span>

                        <h2>
                            Restez informé de nos nouveautés
                        </h2>

                        <p>
                            Recevez nos offres, promotions et
                            nouveautés directement dans votre boîte mail.
                        </p>

                    </div>

                    <form
                        className="newsletter-form"
                        onSubmit={handleNewsletter}
                    >

                        <input
                            type="email"
                            name="email"
                            placeholder="Votre adresse email"
                            required
                        />

                        <button type="submit">
                            S'inscrire
                        </button>

                    </form>

                </div>

            </section>


            {/* =========================
                FOOTER PRINCIPAL
            ========================= */}

            <section className="footer-main">

                <div className="footer-container">

                    <div className="footer-grid">

                        {/* BRAND */}

                        <div className="footer-brand">

                            <div className="footer-logo">

                                <span>
                                    🛍️
                                </span>

                                <div>
                                    DJIM'S
                                    <small>
                                        SHOP
                                    </small>
                                </div>

                            </div>

                            <p>
                                Votre boutique e-commerce moderne
                                et rapide au Tchad.
                                Découvrez des produits de qualité
                                au meilleur prix.
                            </p>


                            {/* SOCIAL */}

                            <div className="footer-socials">

                                <a
                                    href="#"
                                    className="social-facebook"
                                    aria-label="Facebook"
                                >
                                    Facebook
                                </a>

                                <a
                                    href="#"
                                    className="social-whatsapp"
                                    aria-label="WhatsApp"
                                >
                                    WhatsApp
                                </a>

                                <a
                                    href="#"
                                    className="social-instagram"
                                    aria-label="Instagram"
                                >
                                    Instagram
                                </a>

                                <a
                                    href="#"
                                    className="social-linkedin"
                                    aria-label="LinkedIn"
                                >
                                    LinkedIn
                                </a>

                            </div>

                        </div>


                        {/* NAVIGATION */}

                        <div className="footer-column">

                            <h3>
                                Navigation
                            </h3>

                            <Link to="/">
                                Accueil
                            </Link>

                            <Link to="/products">
                                Produits
                            </Link>

                            <Link to="/cart">
                                Mon panier
                            </Link>

                            <Link to="/products">
                                Promotions
                            </Link>

                        </div>


                        {/* CATEGORIES */}

                        <div className="footer-column">

                            <h3>
                                Catégories
                            </h3>

                            <Link to="/products">
                                Téléphones
                            </Link>

                            <Link to="/products">
                                Ordinateurs
                            </Link>

                            <Link to="/products">
                                Accessoires
                            </Link>

                            <Link to="/products">
                                Montres
                            </Link>

                        </div>


                        {/* CONTACT */}

                        <div className="footer-column">

                            <h3>
                                Contact
                            </h3>

                            <p>
                                📍 N'Djamena, Tchad
                            </p>

                            <p>
                                📞 +235 65 53 43 37
                            </p>

                            <p>
                                ✉️ support@djimsshop.com
                            </p>

                            <p>
                                🕐 Lun - Sam : 08h00 - 18h00
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                BOTTOM
            ========================= */}

            <section className="footer-bottom">

                <div className="footer-container footer-bottom-content">

                    <p>
                        © {new Date().getFullYear()} DJIM'S SHOP.
                        Tous droits réservés.
                    </p>

                    <div>

                        <Link to="/privacy">
                            Politique de confidentialité
                        </Link>

                        <Link to="/terms">
                            Conditions générales
                        </Link>

                    </div>

                </div>

            </section>

        </footer>
    );
}

export default Footer;