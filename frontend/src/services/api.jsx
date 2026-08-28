const API_URL = "http://127.0.0.1:8000/api/v1";


export async function apiRequest(
    endpoint,
    options = {}
) {

    const token =
        localStorage.getItem("access_token");


    const headers = {
        ...(options.body instanceof FormData
            ? {}
            : {
                "Content-Type": "application/json",
            }
        ),

        ...(options.headers || {}),
    };


    // =====================================================
    // JWT
    // =====================================================

    if (token) {

        headers.Authorization =
            `Bearer ${token}`;

    }


    // =====================================================
    // REQUEST
    // =====================================================

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers,
        }
    );


    // =====================================================
    // RESPONSE
    // =====================================================

    let data = {};

    try {

        data = await response.json();

    } catch {

        data = {};

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (!response.ok) {

        const error =
            data.detail ||
            data.message ||
            data.error ||
            "Une erreur est survenue.";

        throw new Error(error);

    }


    return data;
}