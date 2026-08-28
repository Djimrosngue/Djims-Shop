import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Search,
    SlidersHorizontal,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import { apiRequest } from "../services/api";


function Products() {

    // =====================================================
    // URL / CATÉGORIE
    // =====================================================

    const [searchParams] = useSearchParams();

    const selectedCategory =
        searchParams.get("category");


    // =====================================================
    // STATE
    // =====================================================

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [sort, setSort] = useState("recent");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // CHARGER LES PRODUITS
    // =====================================================

    const loadProducts = async () => {

        setLoading(true);
        setError("");

        try {

            /*
             * Si une catégorie est sélectionnée,
             * on l'envoie au backend.
             */

            let endpoint = "/products/";

            if (selectedCategory) {

                endpoint +=
                    `?category=${encodeURIComponent(
                        selectedCategory
                    )}`;

            }


            const data = await apiRequest(
                endpoint
            );


            /*
             * Selon ton backend, data peut être :
             *
             * [
             *   {...},
             *   {...}
             * ]
             *
             * ou :
             *
             * {
             *   results: [...]
             * }
             */

            const productList =
                Array.isArray(data)
                    ? data
                    : data.results || [];


            setProducts(productList);

        } catch (err) {

            console.error(
                "Erreur chargement produits :",
                err
            );

            setError(
                err.message ||
                "Impossible de charger les produits."
            );

            setProducts([]);

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // CHARGEMENT INITIAL + CHANGEMENT CATÉGORIE
    // =====================================================

    useEffect(() => {

        loadProducts();

    }, [selectedCategory]);


    // =====================================================
    // RECHERCHE FRONTEND
    // =====================================================

    const filteredProducts =
        products.filter((product) => {

            const searchValue =
                search.toLowerCase().trim();


            if (!searchValue) {
                return true;
            }


            return (

                product.title
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                product.description
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                product.category_name
                    ?.toLowerCase()
                    .includes(searchValue)

            );

        });


    // =====================================================
    // TRI
    // =====================================================

    const sortedProducts = [
        ...filteredProducts
    ].sort((a, b) => {

        if (sort === "price-asc") {

            return (
                Number(a.price) -
                Number(b.price)
            );

        }


        if (sort === "price-desc") {

            return (
                Number(b.price) -
                Number(a.price)
            );

        }


        return (
            new Date(b.created_at) -
            new Date(a.created_at)
        );

    });


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <main className="products-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <section className="products-header">

                <div>

                    <span>
                        DJIM'S SHOP
                    </span>


                    <h1>

                        {selectedCategory
                            ? `Produits : ${selectedCategory}`
                            : "Tous nos produits"}

                    </h1>


                    <p>

                        {selectedCategory

                            ? "Découvrez les produits disponibles dans cette catégorie."

                            : "Découvrez notre sélection de produits électroniques."
                        }

                    </p>

                </div>

            </section>


            <div className="products-container">


                {/* =================================================
                    TOOLBAR
                ================================================= */}

                <div className="products-toolbar">


                    {/* SEARCH */}

                    <div className="search-box">

                        <Search size={19} />

                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* FILTER */}

                    <button
                        type="button"
                        className="filter-button"
                    >

                        <SlidersHorizontal
                            size={18}
                        />

                        Filtrer

                    </button>

                </div>


                {/* =================================================
                    RESULTATS
                ================================================= */}

                <div className="products-result">

                    <span>

                        {loading
                            ? "Chargement..."
                            : `${sortedProducts.length} produit${
                                sortedProducts.length > 1
                                    ? "s"
                                    : ""
                            }`
                        }

                    </span>


                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(
                                e.target.value
                            )
                        }
                    >

                        <option value="recent">
                            Plus récents
                        </option>

                        <option value="price-asc">
                            Prix croissant
                        </option>

                        <option value="price-desc">
                            Prix décroissant
                        </option>

                    </select>

                </div>


                {/* =================================================
                    ERREUR
                ================================================= */}

                {error && (

                    <div className="products-error">

                        ❌ {error}

                    </div>

                )}


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="products-loading">

                        <p>
                            Chargement des produits...
                        </p>

                    </div>

                )}


                {/* =================================================
                    PRODUCTS
                ================================================= */}

                {!loading && !error && (

                    sortedProducts.length > 0 ? (

                        <div className="products-grid">

                            {sortedProducts.map(
                                (product) => (

                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />

                                )
                            )}

                        </div>

                    ) : (

                        <div className="no-products">

                            <h2>
                                Aucun produit trouvé
                            </h2>

                            <p>

                                {selectedCategory

                                    ? "Cette catégorie ne contient aucun produit."

                                    : "Essayez une autre recherche."
                                }

                            </p>

                        </div>

                    )

                )}

            </div>

            

        </main>

    );

}


export default Products;