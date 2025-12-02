/**
 * src/components/FormToggle.tsx
 *
 * @format
 */

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FormToggle() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isAnimating, setIsAnimating] = useState(false);

	const [active, setActive] = useState<"login" | "register">(() =>
		location.pathname.includes("register") ? "register" : "login"
	);

	useEffect(() => {
		setActive(location.pathname.includes("register") ? "register" : "login");
		setIsAnimating(false);
	}, [location.pathname]);

	const selectForm = (form: "login" | "register") => {
		if (isAnimating) return;
		setIsAnimating(true);
		setActive(form);
		setTimeout(() => {
			navigate(form === "register" ? "/auth/register" : "/auth/login");
		}, 200);
	};

	return (
		<div className="relative flex items-center bg-gray-100 rounded-full w-3/5 max-w-xs mx-auto shadow-sm hover:shadow-md transition-shadow">
			<div
				className={`absolute inset-1 top-1/2 -translate-y-1/2 h-10 w-[calc(50%-0.25rem)] rounded-full shadow-md transition-all duration-500 ease-out ${
					active === "register" ? "left-1/2" : "left-1"
				} bg-gradient-to-r from-purple-500 to-purple-600 animate-pulse-subtle`}
			/>

			{/* buttons */}
			<button
				onClick={() => selectForm("login")}
				className={`relative z-10 w-1/2 h-12 text-sm font-semibold rounded-full transition-all duration-500 transform ${
					active === "login"
						? "text-white scale-105"
						: "text-gray-600 hover:text-gray-700 scale-100"
				}`}
				aria-label="Switch to Sign In form">
				Sign In
			</button>

			<button
				onClick={() => selectForm("register")}
				className={`relative z-10 w-1/2 h-12 text-sm font-semibold rounded-full transition-all duration-500 transform ${
					active === "register"
						? "text-white scale-105"
						: "text-gray-600 hover:text-gray-700 scale-100"
				}`}
				aria-label="Switch to Sign Up form">
				Sign Up
			</button>
		</div>
	);
}
