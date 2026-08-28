import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    ArrowRight,
    ShieldCheck,
    Truck,
    Headphones,
    CreditCard,
} from "lucide-react";

import { apiRequest } from "../services/api";


function Home() {

    // ==========================================
    // STATES
    // ==========================================

    const [categories, setCategories] =
        useState([]);

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // CHARGEMENT DES DONNÉES BACKEND
    // ==========================================

    useEffect(() => {

        const loadHomeData = async () => {

            try {

                setLoading(true);
                setError("");


                // ------------------------------------------
                // CATEGORIES
                // ------------------------------------------

                const categoriesData =
                    await apiRequest(
                        "/products/categories/"
                    );


                // ------------------------------------------
                // PRODUITS
                // ------------------------------------------

                const productsData =
                    await apiRequest(
                        "/products/"
                    );


                // ------------------------------------------
                // STOCKAGE DES DONNÉES
                // ------------------------------------------

                setCategories(
                    Array.isArray(categoriesData)
                        ? categoriesData.slice(0, 4)
                        : []
                );


                setProducts(
                    Array.isArray(productsData)
                        ? productsData.slice(0, 4)
                        : []
                );


            } catch (err) {

                console.error(
                    "Erreur chargement accueil :",
                    err
                );

                setError(
                    err.message ||
                    "Impossible de charger les données."
                );


                setCategories([]);
                setProducts([]);


            } finally {

                setLoading(false);

            }

        };


        loadHomeData();

    }, []);


    // ==========================================
    // ICONES DES CATEGORIES
    // ==========================================

    const categoryIcons = {

        "téléphones": "📱",

        "telephones": "📱",

        "ordinateurs": "💻",

        "accessoires": "🎧",

        "montres": "⌚",

    };


    // ==========================================
    // RENDU
    // ==========================================

    return (

        <main>

            {/* HERO */}

            <section className="hero">

                <div className="hero-content">

                    <span className="hero-badge">
                        🛍️ BIENVENUE CHEZ DJIM'S SHOP
                    </span>


                    <h1>
                        La technologie
                        <br />

                        <span>
                            à portée de main.
                        </span>
                    </h1>


                    <p>
                        Découvrez nos produits électroniques,
                        accessoires et équipements au meilleur
                        rapport qualité-prix.
                    </p>


                    <div className="hero-actions">

                        <Link
                            to="/products"
                            className="btn-primary"
                        >
                            Découvrir les produits

                            <ArrowRight size={18} />

                        </Link>


                        <Link
                            to="/products"
                            className="btn-secondary"
                        >
                            Voir la boutique
                        </Link>

                    </div>

                </div>


                <div className="hero-image">

                    <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000"
                        alt="DJIM'S SHOP"
                    />

                </div>

            </section>


            {/* SERVICES */}

            <section className="services">

                <div>

                    <Truck />

                    <div>

                        <strong>
                            Livraison rapide
                        </strong>

                        <span>
                            À N'Djamena
                        </span>

                    </div>

                </div>


                <div>

                    <ShieldCheck />

                    <div>

                        <strong>
                            Paiement sécurisé
                        </strong>

                        <span>
                            Transactions protégées
                        </span>

                    </div>

                </div>


                <div>

                    <CreditCard />

                    <div>

                        <strong>
                            Moov Money
                        </strong>

                        <span>
                            Paiement mobile
                        </span>

                    </div>

                </div>


                <div>

                    <Headphones />

                    <div>

                        <strong>
                            Support client
                        </strong>

                        <span>
                            Assistance disponible
                        </span>

                    </div>

                </div>

            </section>


            {/* CATEGORIES */}

            <section className="home-section">

                <div className="section-heading">

                    <div>

                        <span>
                            NOS CATÉGORIES
                        </span>

                        <h2>
                            Trouvez ce qu'il vous faut
                        </h2>

                    </div>


                    <Link to="/categories">

                        Voir tout

                        <ArrowRight size={17} />

                    </Link>

                </div>


                <div className="categories-grid">

                    {loading ? (

                        <p>
                            Chargement des catégories...
                        </p>

                    ) : categories.length > 0 ? (

                        categories.map((category) => {

                            const categoryKey =
                                category.slug?.toLowerCase();

                            return (

                                <Link
                                    to={`/products?category=${category.slug}`}
                                    className="category-card"
                                    key={category.id}
                                >

                                    <div className="category-icon">

                                        {category.image ? (

                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                loading="lazy"
                                            />

                                        ) : (

                                            categoryIcons[
                                                categoryKey
                                            ] || "🛍️"

                                        )}

                                    </div>


                                    <h3>
                                        {category.name}
                                    </h3>


                                    <span>
                                        Découvrir →
                                    </span>

                                </Link>

                            );

                        })

                    ) : (

                        <p>
                            Aucune catégorie disponible.
                        </p>

                    )}

                </div>

            </section>


            {/* PRODUITS */}

            <section className="home-section products-section">

                <div className="section-heading">

                    <div>

                        <span>
                            SÉLECTION DJIM'S SHOP
                        </span>

                        <h2>
                            Produits populaires
                        </h2>

                    </div>


                    <Link to="/products">

                        Tous les produits

                        <ArrowRight size={17} />

                    </Link>

                </div>


                <div className="home-products">

                    {loading ? (

                        <p>
                            Chargement des produits...
                        </p>

                    ) : products.length > 0 ? (

                        products.map((product) => (

                            <Link
                                to={`/products/${product.slug}`}
                                className="home-product"
                                key={product.id}
                            >

                                <div className="product-image">

                                    {product.image ? (

                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            loading="lazy"
                                        />

                                    ) : (

                                        <div>
                                            🛍️
                                        </div>

                                    )}

                                </div>


                                <div className="product-info">

                                    <h3>
                                        {product.title}
                                    </h3>


                                    <strong>

                                        {Number(
                                            product.price
                                        ).toLocaleString(
                                            "fr-FR"
                                        )}

                                        {" "}FCFA

                                    </strong>

                                </div>

                            </Link>

                        ))

                    ) : (

                        <p>
                            Aucun produit disponible.
                        </p>

                    )}

                </div>


                {error && (

                    <p className="home-error">
                        {error}
                    </p>

                )}

            </section>

        </main>

    );

}


export default Home;