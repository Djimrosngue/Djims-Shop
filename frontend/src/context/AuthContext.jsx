import {
    createContext,
    useState,
} from "react";


export const AuthContext = createContext(null);


const API_URL =
    "http://127.0.0.1:8000/api/v1/auth";


export function AuthProvider({ children }) {


    // ==================================================
    // USER
    // ==================================================

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        try {

            return JSON.parse(savedUser);

        } catch {

            localStorage.removeItem("user");

            return null;

        }

    });


    // ==================================================
    // AUTHENTICATION
    // ==================================================

    const [isAuthenticated, setIsAuthenticated] =
        useState(() => {

            return !!localStorage.getItem(
                "access_token"
            );

        });



    // ==================================================
// UPDATE USER
// ==================================================

const updateUser = (updatedUser) => {

    localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

};
    // ==================================================
    // LOGIN
    // ==================================================

    const login = (data) => {

        console.log(
            "🔐 LOGIN:",
            data
        );


        // ACCESS TOKEN

        if (data.access) {

            localStorage.setItem(
                "access_token",
                data.access
            );

        }


        // REFRESH TOKEN

        if (data.refresh) {

            localStorage.setItem(
                "refresh_token",
                data.refresh
            );

        }


        // USER

        if (data.user) {

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setUser(data.user);

        }


        // AUTHENTICATED

        setIsAuthenticated(true);


        console.log(
            "✅ Connexion réussie"
        );

    };


    // ==================================================
    // LOGOUT
    // ==================================================

    const logout = async () => {

        console.log(
            "🚪 Déconnexion demandée..."
        );


        const accessToken =
            localStorage.getItem(
                "access_token"
            );


        const refreshToken =
            localStorage.getItem(
                "refresh_token"
            );


        // ==================================================
        // DECONNEXION BACKEND
        // ==================================================

        if (
            accessToken &&
            refreshToken
        ) {

            try {

                const response = await fetch(
                    `${API_URL}/logout/`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${accessToken}`,
                        },

                        body: JSON.stringify({
                            refresh:
                                refreshToken,
                        }),
                    }
                );


                if (response.ok) {

                    console.log(
                        "✅ Backend : déconnecté"
                    );

                } else {

                    const data =
                        await response.json()
                            .catch(() => null);

                    console.warn(
                        "⚠️ Backend logout :",
                        response.status,
                        data
                    );

                }

            } catch (error) {

                console.error(
                    "❌ Impossible de contacter Django :",
                    error
                );

            }

        }


        // ==================================================
        // NETTOYAGE FRONTEND
        // ==================================================

        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "refresh_token"
        );

        localStorage.removeItem(
            "user"
        );


        // ==================================================
        // RESET REACT
        // ==================================================

        setUser(null);

        setIsAuthenticated(false);


        console.log(
            "✅ Frontend : déconnecté"
        );

    };


    // ==================================================
    // CONTEXT
    // ==================================================

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateUser,
                isAuthenticated,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}