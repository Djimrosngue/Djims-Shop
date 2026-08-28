import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { apiRequest } from "../services/api";


const CartContext = createContext(null);


export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ==========================================
    // FORMATER LES DONNÉES DU PANIER
    // ==========================================

    const formatCart = (items = []) => {

        return items.map((item) => ({

            id: item.product,

            cartItemId: item.id,

            title: item.product_name,

            price: Number(item.product_price),

            quantity: Number(item.quantity),

            subtotal: Number(item.subtotal),

        }));

    };


    // ==========================================
    // CHARGER LE PANIER DEPUIS DJANGO
    // ==========================================

    const loadCart = async () => {

        const token =
            localStorage.getItem(
                "access_token"
            );


        // Utilisateur non connecté
        if (!token) {

            setCart([]);
            setError("");

            return;

        }


        setLoading(true);
        setError("");


        try {

            const data =
                await apiRequest(
                    "/cart/"
                );


            setCart(
                formatCart(data.items)
            );


        } catch (err) {

            console.error(
                "Erreur chargement panier:",
                err
            );

            setError(
                err.message ||
                "Impossible de charger le panier."
            );

            setCart([]);


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // CHARGEMENT AU DÉMARRAGE
    // ==========================================

    useEffect(() => {

        loadCart();

    }, []);


    // ==========================================
    // AJOUTER AU PANIER
    // ==========================================

    const addToCart = async (
        product,
        quantity = 1
    ) => {

        const token =
            localStorage.getItem(
                "access_token"
            );


        if (!token) {

            throw new Error(
                "Vous devez vous connecter avant d'ajouter un produit au panier."
            );

        }


        setError("");


        try {

            const data =
                await apiRequest(
                    "/cart/add/",
                    {

                        method: "POST",

                        body: JSON.stringify({

                            product_id: product.id,

                            quantity,

                        }),

                    }
                );


            setCart(
                formatCart(data.items)
            );


            return data;


        } catch (err) {

            console.error(
                "Erreur ajout panier:",
                err
            );

            setError(
                err.message ||
                "Impossible d'ajouter le produit au panier."
            );

            throw err;

        }

    };


    // ==========================================
    // MODIFIER LA QUANTITÉ
    // ==========================================

    const updateQuantity = async (
        cartItemId,
        quantity
    ) => {

        if (quantity < 1) {

            return;

        }


        setError("");


        try {

            const data =
                await apiRequest(
                    `/cart/items/${cartItemId}/`,
                    {

                        method: "PATCH",

                        body:
                            JSON.stringify({

                                quantity,

                            }),

                    }
                );


            setCart(
                formatCart(data.items)
            );


        } catch (err) {

            console.error(
                "Erreur modification quantité:",
                err
            );

            setError(
                err.message ||
                "Impossible de modifier la quantité."
            );

            throw err;

        }

    };


    // ==========================================
    // SUPPRIMER UN PRODUIT
    // ==========================================

    const removeFromCart = async (
        cartItemId
    ) => {

        setError("");


        try {

            const data =
                await apiRequest(
                    `/cart/items/${cartItemId}/remove/`,
                    {

                        method: "DELETE",

                    }
                );


            setCart(
                formatCart(data.items)
            );


        } catch (err) {

            console.error(
                "Erreur suppression:",
                err
            );

            setError(
                err.message ||
                "Impossible de supprimer le produit."
            );

            throw err;

        }

    };


    // ==========================================
    // VIDER LE PANIER
    // ==========================================

    const clearCart = async () => {

        setError("");


        try {

            await apiRequest(
                "/cart/clear/",
                {

                    method: "DELETE",

                }
            );


            setCart([]);


        } catch (err) {

            console.error(
                "Erreur vidage panier:",
                err
            );

            setError(
                err.message ||
                "Impossible de vider le panier."
            );

            throw err;

        }

    };


    // ==========================================
    // NOMBRE TOTAL D'ARTICLES
    // ==========================================

    const cartCount =
        cart.reduce(

            (total, item) =>
                total +
                item.quantity,

            0

        );


    // ==========================================
    // PRIX TOTAL
    // ==========================================

    const cartTotal =
        cart.reduce(

            (total, item) =>
                total +
                item.subtotal,

            0

        );


    return (

        <CartContext.Provider
            value={{

                cart,

                loading,

                error,

                cartCount,

                cartTotal,

                loadCart,

                addToCart,

                updateQuantity,

                removeFromCart,

                clearCart,

            }}
        >

            {children}

        </CartContext.Provider>

    );

}


// ==========================================
// HOOK
// ==========================================

export function useCart() {

    const context =
        useContext(
            CartContext
        );


    if (!context) {

        throw new Error(
            "useCart doit être utilisé dans CartProvider"
        );

    }


    return context;

}