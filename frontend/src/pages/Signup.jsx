import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";


function Signup() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirm: ""
    });


    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // ==========================================
    // CHANGE
    // ==========================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Vérification mot de passe

        if (
            formData.password !==
            formData.password_confirm
        ) {

            setError(
                "Les mots de passe ne correspondent pas."
            );

            return;
        }


        setLoading(true);


        try {

            // ==========================================
            // API DJANGO
            // ==========================================

            const data = await apiRequest(
                "/auth/register/",
                {
                    method: "POST",

                    body: JSON.stringify(formData)
                }
            );


            console.log(
                "Inscription réussie :",
                data
            );


            setSuccess(
                "Votre compte a été créé avec succès !"
            );


            // Redirection vers connexion

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (err) {

            console.error(
                "Erreur inscription :",
                err
            );


            setError(
                err.message ||
                "Impossible de créer le compte."
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="auth-page">

            <div className="auth-card signup-card">


                {/* ==================================
                    LOGO
                ================================== */}

                <div className="auth-logo">
                    🛍️
                </div>


                <h1>
                    Créer un compte
                </h1>


                <p className="auth-subtitle">
                    Rejoignez DJIM'S SHOP
                </p>


                {/* ==================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="auth-error">

                        ❌ {error}

                    </div>

                )}


                {/* ==================================
                    SUCCESS
                ================================== */}

                {success && (

                    <div className="auth-success">

                        ✅ {success}

                    </div>

                )}


                {/* ==================================
                    FORM
                ================================== */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* USERNAME */}

                    <div className="auth-group">

                        <label>
                            Nom utilisateur
                        </label>


                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choisissez un nom utilisateur"
                            autoComplete="username"
                            required
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="auth-group">

                        <label>
                            Adresse email
                        </label>


                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="vous@email.com"
                            autoComplete="email"
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="auth-group">

                        <label>
                            Mot de passe
                        </label>


                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Créer un mot de passe"
                            autoComplete="new-password"
                            required
                        />

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div className="auth-group">

                        <label>
                            Confirmer le mot de passe
                        </label>


                        <input
                            type="password"
                            name="password_confirm"
                            value={
                                formData.password_confirm
                            }
                            onChange={handleChange}
                            placeholder="Confirmer le mot de passe"
                            autoComplete="new-password"
                            required
                        />

                    </div>


                    {/* CONDITIONS */}

                    <label className="terms">

                        <input
                            type="checkbox"
                            required
                        />

                        <span>

                            J'accepte les conditions générales
                            et la politique de confidentialité.

                        </span>

                    </label>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Création..."
                            : "Créer mon compte"
                        }

                    </button>

                </form>


                {/* ==================================
                    DIVIDER
                ================================== */}

                <div className="auth-divider">

                    <span>
                        OU
                    </span>

                </div>


                {/* GOOGLE */}

                <button
                    type="button"
                    className="social-login google"
                >

                    🔴 S'inscrire avec Google

                </button>


                {/* FACEBOOK */}

                <button
                    type="button"
                    className="social-login facebook"
                >

                    🔵 S'inscrire avec Facebook

                </button>


                {/* ==================================
                    LOGIN
                ================================== */}

                <p className="auth-footer">

                    Vous avez déjà un compte ?

                    {" "}

                    <Link to="/login">
                        Se connecter
                    </Link>

                </p>

            </div>

        </main>

    );

}


export default Signup;