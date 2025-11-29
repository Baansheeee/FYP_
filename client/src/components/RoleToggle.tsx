/**
 * src/components/RoleToggle.tsx
 *
 * @format
 */

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RoleToggle() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isAnimating, setIsAnimating] = useState(false);

	// derive initial active side from the current route
	const [active, setActive] = useState<"user" | "admin">(() =>
		location.pathname.includes("admin") ? "admin" : "user"
	);

	useEffect(() => {
		setActive(location.pathname.includes("admin") ? "admin" : "user");
		setIsAnimating(false);
	}, [location.pathname]);

	const selectRole = (role: "user" | "admin") => {
		if (isAnimating) return;
		setIsAnimating(true);
		setActive(role);
		setTimeout(() => {
			navigate(role === "admin" ? "/auth/admin-login" : "/auth/login");
		}, 200);
	};

	return (
		<div className="relative flex items-center bg-gray-100 rounded-full w-full h-12 max-w-xs mx-auto shadow-sm hover:shadow-md transition-shadow">
			{/* slider overlay with enhanced animations */}
			<div
				className={`absolute inset-1 top-1/2 -translate-y-1/2 h-10 w-[calc(50%-0.25rem)] rounded-full shadow-md transition-all duration-500 ease-out ${
					active === "admin" ? "left-1/2" : "left-1"
				} bg-gradient-to-r from-purple-500 to-purple-600 animate-pulse-subtle`}
			/>

			{/* buttons */}
			<button
				onClick={() => selectRole("user")}
				className={`relative z-10 w-1/2 h-full text-sm font-semibold rounded-full transition-all duration-500 transform ${
					active === "user"
						? "text-white scale-105"
						: "text-gray-700 hover:text-gray-800 scale-100"
				}`}>
				User
			</button>

			<button
				onClick={() => selectRole("admin")}
				className={`relative z-10 w-1/2 h-full text-sm font-semibold rounded-full transition-all duration-500 transform ${
					active === "admin"
						? "text-white scale-105"
						: "text-gray-700 hover:text-gray-800 scale-100"
				}`}>
				Admin
			</button>
		</div>
	);
}
