import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const analyzeRepository = async (url) => {
    const response = await axios.post(
        `${API_BASE_URL}/api/repositories/analyze`,
        {
            url,
        }
    );

    return response.data;
};