import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Save,
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";


function EditProfile() {

    const navigate = useNavigate();

    const {
        user,
        updateUser,
    } = useAuth();


    // ==================================================
    // FORM DATA
    // ==================================================

    const [formData, setFormData] = useState({

        username:
            user?.username || "",

        email:
            user?.email || "",

        phone:
            user?.phone || "",

        address:
            user?.address || "",

    });


    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    // ==================================================
    // CHANGE
    // ==================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData({
            ...formData,
            [name]: value,
        });

    };


    // ==================================================
    // SUBMIT
    // ==================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setMessage("");

        setError("");


        try {

            const data = await apiRequest(
                "/auth/profile/",
                {
                    method: "PATCH",

                    body:
                        JSON.stringify(
                            formData
                        ),
                }
            );


            // ==========================================
            // MISE À JOUR DU CONTEXT
            // ==========================================

            const updatedUser =
                data.user || data;


            updateUser(
                updatedUser
            );


            setMessage(
                "Profil mis à jour avec succès."
            );


            // ==========================================
            // REDIRECTION
            // ==========================================

            setTimeout(() => {

                navigate(
                    "/profile"
                );

            }, 1000);


        } catch (err) {

            console.error(
                "Erreur profil :",
                err
            );


            setError(
                err.message ||
                "Impossible de modifier le profil."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==================================================
    // USER NON CONNECTÉ
    // ==================================================

    if (!user) {

        return (

            <main className="edit-profile-page">

                <div className="edit-profile-container">

                    <div className="edit-profile-card">

                        <h1>
                            Vous n'êtes pas connecté
                        </h1>

                        <button
                            type="button"
                            className="profile-save-button"
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Se connecter
                        </button>

                    </div>

                </div>

            </main>

        );

    }


    // ==================================================
    // PAGE
    // ==================================================

    return (

        <main className="edit-profile-page">

            <div className="edit-profile-container">


                {/* =====================================
                    RETOUR
                ===================================== */}

                <button
                    type="button"
                    className="profile-back"
                    onClick={() =>
                        navigate("/profile")
                    }
                >

                    <ArrowLeft size={18} />

                    Retour au profil

                </button>


                {/* =====================================
                    CARD
                ===================================== */}

                <section className="edit-profile-card">


                    {/* HEADER */}

                    <div className="edit-profile-header">

                        <div className="edit-profile-icon">

                            <User size={28} />

                        </div>


                        <div>

                            <h1>
                                Modifier mon profil
                            </h1>

                            <p>
                                Mettez à jour vos
                                informations personnelles.
                            </p>

                        </div>

                    </div>


                    {/* =================================
                        MESSAGES
                    ================================= */}

                    {message && (

                        <div className="profile-success">

                            ✅ {message}

                        </div>

                    )}


                    {error && (

                        <div className="profile-error">

                            ❌ {error}

                        </div>

                    )}


                    {/* =================================
                        FORM
                    ================================= */}

                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >


                        {/* USERNAME */}

                        <div className="profile-form-group">

                            <label>

                                <User size={16} />

                                Nom utilisateur

                            </label>


                            <input
                                type="text"
                                name="username"
                                value={
                                    formData.username
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Votre nom utilisateur"
                                autoComplete="username"
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="profile-form-group">

                            <label>

                                <Mail size={16} />

                                Adresse email

                            </label>


                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="vous@email.com"
                                autoComplete="email"
                                required
                            />

                        </div>


                        {/* PHONE */}

                        <div className="profile-form-group">

                            <label>

                                <Phone size={16} />

                                Téléphone

                            </label>


                            <input
                                type="tel"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="+235 XX XX XX XX"
                                autoComplete="tel"
                            />

                        </div>


                        {/* ADDRESS */}

                        <div className="profile-form-group">

                            <label>

                                <MapPin size={16} />

                                Adresse

                            </label>


                            <textarea
                                name="address"
                                value={
                                    formData.address
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Votre adresse"
                                rows="4"
                                autoComplete="street-address"
                            />

                        </div>


                        {/* =================================
                            ACTIONS
                        ================================= */}

                        <div className="edit-profile-actions">

                            <button
                                type="button"
                                className="profile-cancel-button"
                                onClick={() =>
                                    navigate(
                                        "/profile"
                                    )
                                }
                            >
                                Annuler
                            </button>


                            <button
                                type="submit"
                                className="profile-save-button"
                                disabled={loading}
                            >

                                <Save size={18} />

                                {loading
                                    ? "Enregistrement..."
                                    : "Enregistrer"
                                }

                            </button>

                        </div>

                    </form>

                </section>

            </div>

        </main>

    );

}


export default EditProfile;