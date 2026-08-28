import { Link } from "react-router-dom";
import {
    ShoppingCart,
    Eye,
} from "lucide-react";

import { useCart } from "../context/CartContext";


function ProductCard({ product }) {

    const { addToCart } = useCart();

    const price = Number(product.price || 0);

    const handleAddToCart = () => {

        if (product.stock <= 0) {
            return;
        }

        addToCart(product);

    };


    return (

        <article className="product-card">

            <Link
                to={`/products/${product.slug}`}
                className="product-card-image"
            >

                <img
                    src={
                        product.image_url ||
                        "/images/product-placeholder.png"
                    }
                    alt={product.title}
                />

            </Link>


            <div className="product-card-content">

                <span className="product-category">
                    {product.category_name ||
                        "Sans catégorie"}
                </span>


                <Link
                    to={`/products/${product.slug}`}
                >

                    <h3>
                        {product.title}
                    </h3>

                </Link>


                <div className="product-card-bottom">

                    <strong>

                        {price.toLocaleString("fr-FR")}

                        {" "}FCFA

                    </strong>


                    <div className="product-actions">

                        <Link
                            to={`/products/${product.slug}`}
                            className="product-view"
                            title="Voir le produit"
                        >

                            <Eye size={17} />

                        </Link>


                     <button
    className="product-cart"
    title="Ajouter au panier"
    onClick={async () => {

        try {

            await addToCart(
                product,
                1
            );

            alert(
                "Produit ajouté au panier !"
            );

        } catch (error) {

            alert(
                error.message
            );

        }

    }}
>
    <ShoppingCart size={17} />
</button>

                    </div>

                </div>


                <div className="product-stock">

                    {product.stock > 0
                        ? `${product.stock} disponible${
                            product.stock > 1
                                ? "s"
                                : ""
                        }`
                        : "Rupture de stock"
                    }

                </div>

            </div>

        </article>

    );
}


export default ProductCard;