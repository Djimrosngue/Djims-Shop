import { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [sent, setSent] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        // Pour le moment : test frontend
        console.log(formData);

        setSent(true);

        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
        });
    };

    return (

        <main className="contact-page">

            {/* HEADER */}

            <section className="contact-header">

                <span>
                    CONTACT
                </span>

                <h1>
                    Nous sommes à votre écoute
                </h1>

                <p>
                    Une question, une commande ou besoin
                    d'informations ? Contactez l'équipe
                    DJIM'S SHOP.
                </p>

            </section>


            <div className="contact-container">

                <div className="contact-grid">


                    {/* =====================
                        INFORMATIONS
                    ===================== */}

                    <div className="contact-info">

                        <h2>
                            Parlons de votre besoin
                        </h2>

                        <p>
                            Notre équipe est disponible pour
                            répondre à vos questions et vous
                            accompagner dans vos achats.
                        </p>


                        <div className="contact-item">

                            <div className="contact-icon">
                                📍
                            </div>

                            <div>
                                <h3>
                                    Adresse
                                </h3>

                                <p>
                                    N'Djamena, Tchad
                                </p>
                            </div>

                        </div>


                        <div className="contact-item">

                            <div className="contact-icon">
                                📞
                            </div>

                            <div>
                                <h3>
                                    Téléphone
                                </h3>

                                <p>
                                    +235 65 53 43 37
                                </p>
                            </div>

                        </div>


                        <div className="contact-item">

                            <div className="contact-icon">
                                ✉️
                            </div>

                            <div>
                                <h3>
                                    Email
                                </h3>

                                <p>
                                    support@djimsshop.com
                                </p>
                            </div>

                        </div>


                        <div className="contact-item">

                            <div className="contact-icon">
                                🕐
                            </div>

                            <div>
                                <h3>
                                    Horaires
                                </h3>

                                <p>
                                    Lundi - Samedi
                                </p>

                                <p>
                                    08h00 - 18h00
                                </p>
                            </div>

                        </div>


                        {/* WHATSAPP */}

                        <a
                            href="https://wa.me/23565534337"
                            target="_blank"
                            rel="noreferrer"
                            className="contact-whatsapp"
                        >
                            💬 Nous contacter sur WhatsApp
                        </a>

                    </div>


                    {/* =====================
                        FORMULAIRE
                    ===================== */}

                    <div className="contact-form-card">

                        <h2>
                            Envoyez-nous un message
                        </h2>

                        <p>
                            Remplissez le formulaire ci-dessous
                            et nous vous répondrons rapidement.
                        </p>


                        {sent && (

                            <div className="contact-success">
                                ✅ Votre message a été envoyé avec succès.
                            </div>

                        )}


                        <form onSubmit={handleSubmit}>


                            <div className="contact-row">

                                <div className="form-group">

                                    <label>
                                        Nom complet
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Votre nom"
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="vous@email.com"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="contact-row">

                                <div className="form-group">

                                    <label>
                                        Téléphone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+235..."
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Sujet
                                    </label>

                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Choisir un sujet
                                        </option>

                                        <option value="commande">
                                            Ma commande
                                        </option>

                                        <option value="produit">
                                            Question sur un produit
                                        </option>

                                        <option value="paiement">
                                            Paiement
                                        </option>

                                        <option value="livraison">
                                            Livraison
                                        </option>

                                        <option value="autre">
                                            Autre
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div className="form-group">

                                <label>
                                    Message
                                </label>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    placeholder="Écrivez votre message..."
                                    required
                                />

                            </div>


                            <button
                                type="submit"
                                className="contact-submit"
                            >
                                Envoyer le message →
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Contact;