import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");


        try {

            const data = await apiRequest(
                "/auth/login/",
                {
                    method: "POST",

                    body: JSON.stringify(formData)
                }
            );


            console.log(
                "Connexion réussie :",
                data
            );


            /*
             * Sauvegarde JWT + utilisateur
             */

            login(data);


            /*
             * Redirection
             */

            navigate("/");


        } catch (err) {

            console.error(
                "Erreur login :",
                err
            );

            setError(
                err.message ||
                "Identifiants incorrects."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    🛍️
                </div>


                <h1>
                    Bienvenue
                </h1>


                <p className="auth-subtitle">
                    Connectez-vous à votre compte DJIM'S SHOP
                </p>


                {error && (

                    <div className="auth-error">
                        ❌ {error}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <div className="auth-group">

                        <label>
                            Nom utilisateur
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Votre nom utilisateur"
                            autoComplete="username"
                            required
                        />

                    </div>


                    <div className="auth-group">

                        <label>
                            Mot de passe
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Votre mot de passe"
                            autoComplete="current-password"
                            required
                        />

                    </div>


                    <div className="auth-options">

                        <label>

                            <input type="checkbox" />

                            <span>
                                Se souvenir de moi
                            </span>

                        </label>


                        <Link to="/forgot-password">
                            Mot de passe oublié ?
                        </Link>

                    </div>


                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Connexion..."
                            : "Se connecter"
                        }

                    </button>

                </form>


                <div className="auth-divider">

                    <span>
                        OU
                    </span>

                </div>


                <button
                    type="button"
                    className="social-login google"
                >
                    🔴 Continuer avec Google
                </button>


                <button
                    type="button"
                    className="social-login facebook"
                >
                    🔵 Continuer avec Facebook
                </button>


                <p className="auth-footer">

                    Vous n'avez pas encore de compte ?

                    <Link to="/signup">
                        Créer un compte
                    </Link>

                </p>

            </div>

        </main>

    );

}


export default Login;