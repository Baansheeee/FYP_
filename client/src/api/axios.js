/** @format */

// src/api/axios.ts
import axios from "axios";

// Get API base URL from environment or use localhost
const API_BASE_URL =
	import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const SERVER_BASE_URL = API_BASE_URL.replace("/api/v1", ""); // http://localhost:5000

// Base instance for API calls
const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});

// Add authorization token to every request
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Helper function to get full file URL
export const getFileUrl = (filePath) => {
	if (!filePath) return "";
	// If it's already a full URL, return as is
	if (filePath.startsWith("http")) return filePath;
	// If it starts with /uploads, prepend server base URL
	if (filePath.startsWith("/uploads")) return `${SERVER_BASE_URL}${filePath}`;
	// Otherwise assume it needs /uploads prefix
	return `${SERVER_BASE_URL}/uploads/${filePath}`;
};

export default axiosInstance;
