import { Link, NavLink ,useNavigate} from "react-router-dom";

import {
    ShoppingCart,
    User,
    UserPlus,
    LogOut,
    Menu,
    X,
} from "lucide-react";

import { useState } from "react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/useAuth";


function Navbar() {

    const [open, setOpen] = useState(false);

    const { cartCount } = useCart();

    const navigate = useNavigate();

    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();


    const closeMenu = () => {
        setOpen(false);
    };


    const handleLogout = async () => {

    await logout();

    closeMenu();

    navigate("/");

};


    return (

        <header className="navbar-wrapper">

            <nav className="shop-navbar">

                <div className="navbar-container">


                    {/* =========================
                        LOGO
                    ========================= */}

                    <Link
                        to="/"
                        className="shop-logo"
                        onClick={closeMenu}
                    >

                        <span className="logo-icon">
                            🛍️
                        </span>

                        <span>
                            DJIM'S
                            <small>SHOP</small>
                        </span>

                    </Link>


                    {/* =========================
                        MENU
                    ========================= */}

                    <div
                        className={
                            open
                                ? "navbar-menu active"
                                : "navbar-menu"
                        }
                    >

                        <NavLink
                            to="/"
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            Accueil
                        </NavLink>


                        <NavLink
                            to="/products"
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            Produits
                        </NavLink>


                        <NavLink
                            to="/categories"
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            Catégories
                        </NavLink>


                        <NavLink
                            to="/contact"
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            Contact
                        </NavLink>


                        {/* =========================
                            AUTH MOBILE
                        ========================= */}

                        <div className="mobile-auth">

                            {!isAuthenticated ? (

                                <>

                                    <Link
                                        to="/login"
                                        className="mobile-login"
                                        onClick={closeMenu}
                                    >

                                        <User size={18} />

                                        <span>
                                            Connexion
                                        </span>

                                    </Link>


                                    <Link
                                        to="/signup"
                                        className="mobile-signup"
                                        onClick={closeMenu}
                                    >

                                        <UserPlus size={18} />

                                        <span>
                                            Inscription
                                        </span>

                                    </Link>

                                </>

                            ) : (

                                <>

                                    <Link
                                        to="/profile"
                                        className="mobile-login"
                                        onClick={closeMenu}
                                    >

                                        <User size={18} />

                                        <span>
                                            {user?.username ||
                                                user?.email ||
                                                "Mon compte"}
                                        </span>

                                    </Link>


                                    <button
                                        type="button"
                                        className="mobile-logout"
                                        onClick={handleLogout}
                                    >

                                        <LogOut size={18} />

                                        <span>
                                            Déconnexion
                                        </span>

                                    </button>

                                </>

                            )}

                        </div>

                    </div>


                    {/* =========================
                        ACTIONS
                    ========================= */}

                    <div className="navbar-actions">


                        {/* =========================
                            PANIER
                        ========================= */}

                        <Link
                            to="/cart"
                            className="cart-button"
                            title="Mon panier"
                            onClick={closeMenu}
                        >

                            <ShoppingCart size={21} />


                            {cartCount > 0 && (

                                <span className="cart-badge">
                                    {cartCount}
                                </span>

                            )}

                        </Link>


                        {/* =========================
                            COMPTE DESKTOP
                        ========================= */}

                        <div className="desktop-auth">


                            {!isAuthenticated ? (

                                <>

                                    {/* CONNEXION */}

                                    <Link
                                        to="/login"
                                        className="account-button"
                                        onClick={closeMenu}
                                    >

                                        <User size={19} />

                                        <span>
                                            Connexion
                                        </span>

                                    </Link>


                                    {/* INSCRIPTION */}

                                    <Link
                                        to="/signup"
                                        className="signup-button"
                                        onClick={closeMenu}
                                    >

                                        <UserPlus size={17} />

                                        <span>
                                            Inscription
                                        </span>

                                    </Link>

                                </>

                            ) : (

                                <>

                                    {/* PROFIL */}

                                    <Link
                                        to="/profile"
                                        className="account-button"
                                        onClick={closeMenu}
                                    >

                                        <User size={19} />

                                        <span>
                                            {user?.username ||
                                                user?.email ||
                                                "Mon compte"}
                                        </span>

                                    </Link>


                                    {/* LOGOUT */}

                                    <button
                                        type="button"
                                        className="logout-button"
                                        onClick={handleLogout}
                                    >

                                        <LogOut size={17} />

                                        <span>
                                            Déconnexion
                                        </span>

                                    </button>

                                </>

                            )}

                        </div>


                        {/* =========================
                            MENU MOBILE
                        ========================= */}

                        <button
                            type="button"
                            className="mobile-menu-button"
                            onClick={() =>
                                setOpen(!open)
                            }
                            aria-label={
                                open
                                    ? "Fermer le menu"
                                    : "Ouvrir le menu"
                            }
                        >

                            {open ? (

                                <X size={24} />

                            ) : (

                                <Menu size={24} />

                            )}

                        </button>

                    </div>

                </div>

            </nav>

        </header>

    );
}


export default Navbar;