import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../services/api";


function Categories() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // CHARGER LES CATÉGORIES
    // ==========================================

    useEffect(() => {

        const loadCategories = async () => {

            try {

                setLoading(true);
                setError("");


                const data = await apiRequest(
                    "/products/categories/"
                );


                /*
                 * Supporte également une réponse
                 * paginée { results: [...] }
                 */

                const categoryList =
                    Array.isArray(data)
                        ? data
                        : data.results || [];


                setCategories(
                    categoryList
                );


            } catch (error) {

                console.error(
                    "Erreur chargement catégories :",
                    error
                );

                setError(
                    error.message ||
                    "Impossible de charger les catégories."
                );


            } finally {

                setLoading(false);

            }

        };


        loadCategories();

    }, []);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <main className="categories-page">

                <div className="categories-loading">

                    Chargement des catégories...

                </div>

            </main>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <main className="categories-page">

                <div className="categories-container">

                    <div className="categories-error">

                        <h2>
                            Une erreur est survenue
                        </h2>

                        <p>
                            {error}
                        </p>

                    </div>

                </div>

            </main>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <main className="categories-page">

            <div className="categories-container">


                {/* HEADER */}

                <div className="categories-header">

                    <span>
                        NOS CATÉGORIES
                    </span>

                    <h1>
                        Découvrez nos catégories
                    </h1>

                    <p>
                        Explorez notre sélection de produits
                        par catégorie.
                    </p>

                </div>


                {/* AUCUNE CATEGORIE */}

                {categories.length === 0 ? (

                    <div className="categories-empty">

                        <h2>
                            Aucune catégorie disponible
                        </h2>

                        <p>
                            Les catégories seront bientôt disponibles.
                        </p>

                    </div>

                ) : (

                    /* CATEGORIES */

                    <div className="categories-grid">

                        {categories.map((category) => (

                            <Link
                                key={category.id}

                                /*
                                 * IMPORTANT :
                                 * On envoie le slug vers Products
                                 */

                                to={`/products?category=${encodeURIComponent(
                                    category.slug
                                )}`}

                                className="category-card"
                            >

                                <div className="category-image">

                                    {category.image ? (

                                        <img
                                            src={category.image}
                                            alt={category.name}
                                        />

                                    ) : (

                                        <span>
                                            🛍️
                                        </span>

                                    )}

                                </div>


                                <div className="category-content">

                                    <h2>
                                        {category.name}
                                    </h2>


                                    {category.description && (

                                        <p>
                                            {category.description}
                                        </p>

                                    )}


                                    <span className="category-link">

                                        Découvrir →

                                    </span>

                                </div>

                            </Link>

                        ))}

                    </div>

                )}

            </div>

        </main>

    );

}


export default Categories;