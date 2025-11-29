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

	// derive initial active side from the current route
	const [active, setActive] = useState<"user" | "admin">(() =>
		location.pathname.includes("admin") ? "admin" : "user"
	);

	useEffect(() => {
		setActive(location.pathname.includes("admin") ? "admin" : "user");
	}, [location.pathname]);

	const selectRole = (role: "user" | "admin") => {
		setActive(role);
		navigate(role === "admin" ? "/auth/admin-login" : "/auth/login");
	};

	return (
		<div className="relative flex items-center bg-gray-100 rounded-full w-full h-12 max-w-xs mx-auto shadow-inner">
			{/* slider overlay */}
			<div
				className={`absolute inset-1 top-1/2 -translate-y-1/2 h-10 w-[calc(50%-0.25rem)] rounded-full shadow-md transition-all duration-300 ease-in-out ${
					active === "admin" ? "left-1/2" : "left-1"
				} ${
					active === "admin"
						? "bg-gradient-to-r gradient-purple"
						: "bg-gradient-to-r gradient-purple"
				}`}
			/>

			{/* buttons */}
			<button
				onClick={() => selectRole("user")}
				className={`relative z-10 w-1/2 h-full text-sm font-semibold rounded-full transition-colors duration-300 ${
					active === "user" ? "text-white" : "text-gray-700"
				}`}>
				User
			</button>

			<button
				onClick={() => selectRole("admin")}
				className={`relative z-10 w-1/2 h-full text-sm font-semibold rounded-full transition-colors duration-300 ${
					active === "admin" ? "text-white" : "text-gray-700"
				}`}>
				Admin
			</button>
		</div>
	);
}
