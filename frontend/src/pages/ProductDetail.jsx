import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    ShoppingCart,
    Heart,
    Minus,
    Plus,
    ArrowLeft,
    Truck,
    ShieldCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { apiRequest } from "../services/api";


function ProductDetail() {

    const { slug } = useParams();

    const navigate = useNavigate();

    const {
        addToCart,
    } = useCart();


    // =====================================================
    // STATE
    // =====================================================

    const [product, setProduct] =
        useState(null);

    const [quantity, setQuantity] =
        useState(1);

    const [loading, setLoading] =
        useState(true);

    const [addingToCart, setAddingToCart] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // =====================================================
    // CHARGER LE PRODUIT
    // =====================================================

    useEffect(() => {

        const loadProduct = async () => {

            try {

                setLoading(true);

                setError("");

                const data =
                    await apiRequest(
                        `/products/${slug}/`
                    );

                setProduct(data);

                setQuantity(1);

            } catch (err) {

                console.error(
                    "Erreur produit :",
                    err
                );

                setError(
                    err.message ||
                    "Impossible de charger le produit."
                );

            } finally {

                setLoading(false);

            }

        };


        loadProduct();

    }, [slug]);


    // =====================================================
    // AJOUTER AU PANIER
    // =====================================================

    const handleAddToCart = async () => {

        if (!product) {
            return;
        }


        const stock =
            Number(product.stock);


        if (stock <= 0) {

            setError(
                "Ce produit est en rupture de stock."
            );

            return;

        }


        if (quantity > stock) {

            setError(
                "La quantité demandée dépasse le stock disponible."
            );

            return;

        }


        try {

            setAddingToCart(true);

            setError("");

            setSuccess("");


            /*
             * UN SEUL APPEL AU BACKEND
             *
             * CartContext appelle :
             *
             * POST /api/v1/cart/add/
             */

            await addToCart(
                product,
                quantity
            );


            setSuccess(
                "Produit ajouté au panier avec succès."
            );


        } catch (err) {

            console.error(
                "Erreur ajout panier :",
                err
            );

            setError(
                err.message ||
                "Impossible d'ajouter le produit au panier."
            );

        } finally {

            setAddingToCart(false);

        }

    };


    // =====================================================
    // DIMINUER QUANTITÉ
    // =====================================================

    const decreaseQuantity = () => {

        setQuantity(
            (current) =>
                Math.max(
                    1,
                    current - 1
                )
        );

        setSuccess("");

    };


    // =====================================================
    // AUGMENTER QUANTITÉ
    // =====================================================

    const increaseQuantity = () => {

        if (!product) {
            return;
        }


        const stock =
            Number(product.stock);


        setQuantity(
            (current) =>
                Math.min(
                    stock,
                    current + 1
                )
        );

        setSuccess("");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <main className="product-detail-page">

                <div className="product-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Chargement du produit...
                    </p>

                </div>

            </main>

        );

    }


    // =====================================================
    // ERREUR / PRODUIT INTROUVABLE
    // =====================================================

    if (error && !product) {

        return (

            <main className="product-detail-page">

                <div className="product-not-found">

                    <h1>
                        Produit introuvable
                    </h1>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/products"
                        className="back-products"
                    >

                        <ArrowLeft size={18} />

                        Retour aux produits

                    </Link>

                </div>

            </main>

        );

    }


    if (!product) {

        return null;

    }


    // =====================================================
    // IMAGE PRODUIT
    // =====================================================

    const imageUrl = product.image
        ? product.image.startsWith("http")
            ? product.image
            : `http://${window.location.hostname}:8000${product.image}`
        : "/placeholder-product.png";


    // =====================================================
    // STOCK
    // =====================================================

    const stock =
        Number(product.stock);


    const isOutOfStock =
        stock <= 0;


    // =====================================================
    // TOTAL
    // =====================================================

    const totalPrice =
        Number(product.price) *
        quantity;


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <main className="product-detail-page">

            <div className="product-detail-container">


                {/* =================================================
                    RETOUR
                ================================================= */}

                <button
                    type="button"
                    className="back-products"
                    onClick={() =>
                        navigate("/products")
                    }
                >

                    <ArrowLeft size={18} />

                    Retour aux produits

                </button>


                <div className="product-detail-grid">


                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div className="product-detail-image">

                        <img
                            src={imageUrl}
                            alt={product.title}
                            onError={(e) => {

                                e.currentTarget.src =
                                    "/placeholder-product.png";

                            }}
                        />

                    </div>


                    {/* =================================================
                        INFORMATIONS
                    ================================================= */}

                    <div className="product-detail-info">


                        {/* CATÉGORIE */}

                        <span className="detail-category">

                            {product.category_name ||
                                product.category?.name ||
                                "Catégorie"}

                        </span>


                        {/* TITRE */}

                        <h1>
                            {product.title}
                        </h1>


                        {/* PRIX */}

                        <div className="detail-price">

                            <strong>

                                {Number(
                                    product.price
                                ).toLocaleString(
                                    "fr-FR"
                                )}

                                {" "}FCFA

                            </strong>

                        </div>


                        {/* DESCRIPTION */}

                        <p className="detail-description">

                            {product.description ||
                                "Aucune description disponible."}

                        </p>


                        {/* STOCK */}

                        <div
                            className={
                                isOutOfStock
                                    ? "stock stock-empty"
                                    : "stock stock-available"
                            }
                        >

                            {isOutOfStock
                                ? "Rupture de stock"
                                : `${stock} produit${
                                    stock > 1
                                        ? "s"
                                        : ""
                                } disponible${
                                    stock > 1
                                        ? "s"
                                        : ""
                                }`
                            }

                        </div>


                        {/* MESSAGE SUCCÈS */}

                        {success && (

                            <div className="product-success">

                                ✓ {success}

                            </div>

                        )}


                        {/* MESSAGE ERREUR */}

                        {error && product && (

                            <div className="product-error">

                                ⚠️ {error}

                            </div>

                        )}


                        {/* =================================================
                            QUANTITÉ
                        ================================================= */}

                        <div className="quantity-section">

                            <span>
                                Quantité
                            </span>


                            <div className="quantity-control">

                                <button
                                    type="button"
                                    disabled={
                                        quantity <= 1 ||
                                        isOutOfStock
                                    }
                                    onClick={
                                        decreaseQuantity
                                    }
                                    aria-label="Diminuer la quantité"
                                >

                                    <Minus size={16} />

                                </button>


                                <span>
                                    {quantity}
                                </span>


                                <button
                                    type="button"
                                    disabled={
                                        quantity >= stock ||
                                        isOutOfStock
                                    }
                                    onClick={
                                        increaseQuantity
                                    }
                                    aria-label="Augmenter la quantité"
                                >

                                    <Plus size={16} />

                                </button>

                            </div>

                        </div>


                        {/* TOTAL */}

                        {!isOutOfStock && (

                            <div className="detail-total">

                                <span>
                                    Total
                                </span>

                                <strong>

                                    {totalPrice.toLocaleString(
                                        "fr-FR"
                                    )}

                                    {" "}FCFA

                                </strong>

                            </div>

                        )}


                        {/* =================================================
                            ACTIONS
                        ================================================= */}

                        <div className="detail-actions">

                            <button
                                type="button"
                                className="add-cart-button"
                                disabled={
                                    isOutOfStock ||
                                    addingToCart
                                }
                                onClick={
                                    handleAddToCart
                                }
                            >

                                <ShoppingCart size={20} />

                                {addingToCart
                                    ? "Ajout en cours..."
                                    : isOutOfStock
                                        ? "Rupture de stock"
                                        : "Ajouter au panier"
                                }

                            </button>


                            <button
                                type="button"
                                className="favorite-button"
                                aria-label="Ajouter aux favoris"
                            >

                                <Heart size={21} />

                            </button>

                        </div>


                        {/* =================================================
                            SERVICES
                        ================================================= */}

                        <div className="detail-services">


                            <div>

                                <Truck size={21} />

                                <div>

                                    <strong>
                                        Livraison rapide
                                    </strong>

                                    <span>
                                        Livraison disponible
                                    </span>

                                </div>

                            </div>


                            <div>

                                <ShieldCheck size={21} />

                                <div>

                                    <strong>
                                        Paiement sécurisé
                                    </strong>

                                    <span>
                                        Mobile Money disponible
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>

    );

}


export default ProductDetail;