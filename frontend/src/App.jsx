import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";


function App() {

    return (

        <BrowserRouter>

            {/* NAVBAR GLOBALE */}
            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

               <Route
                    path="/products/:slug"
                    element={<ProductDetail />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />
                <Route
                    path="/categories"
                    element={<Categories />}
                />
                <Route
                    path="/contact"
                    element={<Contact />}
                />
                <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />
            <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                    path="/profile/edit"
                    element={<EditProfile />}
                />
                <Route
                    path="/terms"
                    element={<Terms />}
                />

                <Route
                    path="/privacy"
                    element={<Privacy />}
                />
                {/* PAGE INCONNUE → ACCUEIL */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
        <Footer />
        </BrowserRouter>
    );
}

export default App;