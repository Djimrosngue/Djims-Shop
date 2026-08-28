import { Link } from "react-router-dom";

import {
    Trash2,
    Minus,
    Plus,
    ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";


function Cart() {

    const {
        cart,
        cartTotal,
        cartCount,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
        error,
    } = useCart();


    // ==========================================
    // PANIER VIDE
    // ==========================================

    if (!loading && cart.length === 0) {

        return (

            <main className="cart-page">

                <div className="empty-cart">

                    <ShoppingBag size={60} />

                    <h1>
                        Votre panier est vide
                    </h1>

                    <p>
                        Découvrez nos produits
                        et ajoutez vos articles
                        préférés.
                    </p>

                    <Link
                        to="/products"
                        className="continue-shopping"
                    >
                        Découvrir les produits
                    </Link>

                </div>

            </main>
        );
    }


    // ==========================================
    // PANIER
    // ==========================================

    return (

        <main className="cart-page">

            <div className="cart-container">

                {/* HEADER */}

                <div className="cart-header">

                    <div>

                        <span>
                            DJIM'S SHOP
                        </span>

                        <h1>
                            Mon panier
                        </h1>

                    </div>

                    <span>
                        {cartCount} article(s)
                    </span>

                </div>


                {/* ERREUR BACKEND */}

                {error && (

                    <div className="cart-error">

                        ❌ {error}

                    </div>

                )}


                {/* CHARGEMENT */}

                {loading ? (

                    <div className="cart-loading">

                        Chargement de votre panier...

                    </div>

                ) : (

                    <div className="cart-layout">

                        {/* ==================================
                            ARTICLES
                        ================================== */}

                        <div className="cart-items">

                            {cart.map((item) => (

                                <div
                                    className="cart-item"
                                    key={item.cartItemId}
                                >

                                    {/* IMAGE */}

                                    <div className="cart-item-image">

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />

                                    </div>


                                    {/* INFORMATIONS */}

                                    <div className="cart-item-info">

                                        <span>
                                            {item.category}
                                        </span>

                                        <h3>
                                            {item.title}
                                        </h3>

                                        <strong>
                                            {item.price.toLocaleString(
                                                "fr-FR"
                                            )} FCFA
                                        </strong>

                                    </div>


                                    {/* ==================================
                                        QUANTITÉ
                                    ================================== */}

                                    <div className="cart-quantity">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.cartItemId,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={
                                                item.quantity <= 1
                                            }
                                            aria-label="Diminuer la quantité"
                                        >

                                            <Minus size={15} />

                                        </button>


                                        <span>
                                            {item.quantity}
                                        </span>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.cartItemId,
                                                    item.quantity + 1
                                                )
                                            }
                                            aria-label="Augmenter la quantité"
                                        >

                                            <Plus size={15} />

                                        </button>

                                    </div>


                                    {/* TOTAL ARTICLE */}

                                    <strong className="cart-item-total">

                                        {(
                                            item.price *
                                            item.quantity
                                        ).toLocaleString(
                                            "fr-FR"
                                        )}

                                        {" "}FCFA

                                    </strong>


                                    {/* SUPPRIMER */}

                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick={() =>
                                            removeFromCart(
                                                item.cartItemId
                                            )
                                        }
                                        aria-label="Supprimer le produit"
                                    >

                                        <Trash2 size={18} />

                                    </button>

                                </div>

                            ))}


                            {/* VIDER LE PANIER */}

                            {cart.length > 0 && (

                                <button
                                    type="button"
                                    className="clear-cart"
                                    onClick={clearCart}
                                >
                                    Vider le panier
                                </button>

                            )}

                        </div>


                        {/* ==================================
                            RÉSUMÉ
                        ================================== */}

                        <aside className="cart-summary">

                            <h2>
                                Résumé de la commande
                            </h2>


                            <div>

                                <span>
                                    Articles
                                </span>

                                <strong>
                                    {cartCount}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Sous-total
                                </span>

                                <strong>
                                    {cartTotal.toLocaleString(
                                        "fr-FR"
                                    )} FCFA
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Livraison
                                </span>

                                <strong>
                                    À déterminer
                                </strong>

                            </div>


                            <hr />


                            <div className="cart-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    {cartTotal.toLocaleString(
                                        "fr-FR"
                                    )} FCFA
                                </strong>

                            </div>


                            <Link
                                to="/checkout"
                                className="checkout-button"
                            >
                                Passer la commande
                            </Link>


                            <Link
                                to="/products"
                                className="continue-shopping"
                            >
                                Continuer mes achats
                            </Link>

                        </aside>

                    </div>

                )}

            </div>

        </main>
    );
}


export default Cart;
