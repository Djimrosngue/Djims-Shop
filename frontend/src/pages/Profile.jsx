import { Link, useNavigate } from "react-router-dom";

import {
    User,
    Mail,
    Phone,
    MapPin,
    ShoppingBag,
    LogOut,
    Edit,
} from "lucide-react";

import { useAuth } from "../context/useAuth";


function Profile() {

    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();


    // ==========================================
    // DECONNEXION
    // ==========================================

    const handleLogout = async () => {

       await logout();

        navigate("/login");

    };


    // ==========================================
    // NON CONNECTE
    // ==========================================

    if (!user) {

        return (

            <main className="profile-page">

                <div className="profile-card">

                    <div className="profile-avatar">
                        <User size={40} />
                    </div>

                    <h2>
                        Vous n'êtes pas connecté
                    </h2>

                    <p>
                        Connectez-vous pour accéder
                        à votre profil.
                    </p>

                    <Link
                        to="/login"
                        className="auth-button"
                    >
                        Se connecter
                    </Link>

                </div>

            </main>

        );

    }


    // ==========================================
    // PROFILE
    // ==========================================

    return (

        <main className="profile-page">

            <div className="profile-container">


                {/* ==================================
                    HEADER
                ================================== */}

                <section className="profile-header">

                    <div className="profile-avatar">

                        <User size={42} />

                    </div>


                    <div>

                        <h1>
                            {user.username ||
                                "Mon profil"}
                        </h1>

                        <p>
                            Bienvenue sur DJIM'S SHOP
                        </p>

                    </div>

                </section>


                {/* ==================================
                    INFORMATIONS
                ================================== */}

                <section className="profile-card">

                    <h2>
                        Informations personnelles
                    </h2>


                    <div className="profile-info">


                        {/* USERNAME */}

                        <div>

                            <User size={20} />

                            <span>

                                <small>
                                    Nom utilisateur
                                </small>

                                {user.username ||
                                    "Non renseigné"}

                            </span>

                        </div>


                        {/* EMAIL */}

                        <div>

                            <Mail size={20} />

                            <span>

                                <small>
                                    Email
                                </small>

                                {user.email ||
                                    "Non renseigné"}

                            </span>

                        </div>


                        {/* PHONE */}

                        <div>

                            <Phone size={20} />

                            <span>

                                <small>
                                    Téléphone
                                </small>

                                {user.phone ||
                                    "Non renseigné"}

                            </span>

                        </div>


                        {/* ADDRESS */}

                        <div>

                            <MapPin size={20} />

                            <span>

                                <small>
                                    Adresse
                                </small>

                                {user.address ||
                                    "Non renseignée"}

                            </span>

                        </div>

                    </div>

                </section>


                {/* ==================================
                    ACTIONS
                ================================== */}

                <section className="profile-actions">


                    {/* COMMANDES */}

                    <Link
                        to="/orders"
                        className="profile-action"
                    >

                        <ShoppingBag size={22} />

                        <div>

                            <strong>
                                Mes commandes
                            </strong>

                            <span>
                                Consulter mes achats
                            </span>

                        </div>

                    </Link>


                    {/* MODIFIER PROFIL */}

                    <Link
                        to="/profile/edit"
                        className="profile-action"
                    >

                        <Edit size={22} />

                        <div>

                            <strong>
                                Modifier mon profil
                            </strong>

                            <span>
                                Modifier mes informations
                            </span>

                        </div>

                    </Link>


                    {/* DECONNEXION */}

                    <button
                        type="button"
                        className="profile-logout"
                        onClick={handleLogout}
                    >

                        <LogOut size={22} />

                        <div>

                            <strong>
                                Déconnexion
                            </strong>

                            <span>
                                Quitter mon compte
                            </span>

                        </div>

                    </button>


                </section>

            </div>

        </main>

    );

}


export default Profile;