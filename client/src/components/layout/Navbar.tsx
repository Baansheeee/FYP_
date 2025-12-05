/**
 *
 * @format
 */

import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import Logo from "@/components/Logo";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
	isDark?: boolean;
}

const Navbar = ({ isDark = false }: NavbarProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const authContext = useContext(AuthContext);
	const user = authContext?.user;
	const logout = authContext?.logout;

	const isAdminPage = location.pathname.startsWith("/admin");
	const shouldBeDark = isDark || isAdminPage;

	const navItems = [
		{ name: "Home", path: "/" },
		{ name: "Features", path: "/features" },
		{ name: "Pricing", path: "/pricing" },
		{ name: "About Us", path: "/about" },
		{ name: "Contact Us", path: "/contact" },
	];

	const handleLogout = async () => {
		try {
			await logout?.();
			toast.success("Logged out successfully");
			navigate("/auth/login");
		} catch (err: any) {
			console.error("Logout error:", err);
			toast.error("Logout failed");
		}
	};

	return (
		<nav
			className={`sticky top-0 z-50 w-full border-b ${
				shouldBeDark
					? "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-lg shadow-cyan-500/10"
					: "border-border/40 glass-card"
			}`}>
			<div className="container mx-auto max-w-screen-2xl px-4 h-16 flex items-center justify-between">
				<Link
					to="/"
					className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
					<div className="w-10 h-10 rounded-sm gradient-purple flex items-center justify-center">
						<Logo size="sm" />
					</div>
					<span
						className={`font-bold hidden sm:inline ${
							shouldBeDark
								? "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
								: "text-gradient"
						}`}>
						AWSOME
					</span>
				</Link>
				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-8 flex-1 justify-center">
					{navItems.map((item) => {
						const isActive = location.pathname === item.path;
						return isActive ? (
							<Button
								key={item.name}
								variant="outline"
								size="sm"
								asChild
								className={
									shouldBeDark
										? "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
										: ""
								}>
								<Link to={item.path}>{item.name}</Link>
							</Button>
						) : (
							<Button
								key={item.name}
								variant="ghost"
								size="sm"
								asChild
								className={
									shouldBeDark
										? "text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
										: ""
								}>
								<Link to={item.path}>{item.name}</Link>
							</Button>
						);
					})}
				</div>
				<div className="hidden md:flex items-center gap-3">
					{user ? (
						// Authenticated user
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className={`flex items-center gap-2 h-12 ${
										shouldBeDark ? "text-cyan-300 hover:bg-cyan-500/10" : ""
									}`}>
									{user.role === 2 ? (
										// Admin
										<>
											<div
												className={`w-10 h-10 rounded-full flex items-center justify-center ${
													shouldBeDark
														? "bg-gradient-to-r from-cyan-500 to-blue-600"
														: "bg-gradient-to-r from-purple-500 to-purple-600"
												}`}>
												<User className="w-10 h-10 text-white" />
											</div>
											<span className="text-sm font-medium">
												Hello, {user.name}
											</span>
										</>
									) : (
										// Regular user
										<>
											<Avatar>
												<AvatarImage
													src={user.googleProfilePicture}
													alt={user.name}
												/>
												<AvatarFallback className="bg-gradient-to-r from-purple-400 to-purple-500">
													<User className="w-5 h-5 text-white" />
												</AvatarFallback>
											</Avatar>
											<span className="text-sm font-medium">
												{user.name || "User"}
											</span>
										</>
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className={shouldBeDark ? "bg-slate-800 border-slate-700" : ""}>
								{user.role !== 2 && (
									<DropdownMenuItem
										onClick={() => {
											navigate("/user/profile");
										}}
										className={`cursor-pointer ${
											shouldBeDark
												? "text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10"
												: "text-black"
										}`}>
										<User className="w-4 h-4 mr-2" />
										My Profile
									</DropdownMenuItem>
								)}
								<DropdownMenuItem
									onClick={() => {
										if (user.role === 1) {
											navigate("/user/dashboard");
										} else if (user.role === 2) {
											navigate("/admin");
										}
									}}
									className={`cursor-pointer ${
										shouldBeDark
											? "text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10"
											: "text-black"
									}`}>
									<LogOut className="w-4 h-4 mr-2" />
									Dashboard
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={handleLogout}
									className={`cursor-pointer ${
										shouldBeDark
											? "text-red-400 hover:bg-red-500/10 focus:bg-red-500/10"
											: "text-red-500 hover:bg-red-50"
									}`}>
									<LogOut className="w-4 h-4 mr-2" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						// Not authenticated
						<>
							<Button
								variant="ghost"
								size="sm"
								asChild
								className={
									shouldBeDark
										? "text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
										: ""
								}>
								<Link to="/auth/login">Login</Link>
							</Button>
							<Button
								size="sm"
								className={
									shouldBeDark
										? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
										: "gradient-purple text-white shadow-md hover:shadow-lg hover:shadow-purple-glow/50 transition-all duration-300"
								}
								asChild>
								<Link to="/auth/register">Get Started</Link>
							</Button>
						</>
					)}
				</div>
				{/* Mobile Menu */}
				<Sheet>
					<SheetTrigger asChild className="md:hidden">
						<Button variant="ghost" size="icon">
							<Menu className="h-5 w-5" />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<div className="flex flex-col gap-4 mt-8">
							{navItems.map((item) => {
								const isActive = location.pathname === item.path;
								return isActive ? (
									<Button
										key={item.name}
										variant="outline"
										size="sm"
										asChild
										className="justify-start">
										<Link to={item.path}>{item.name}</Link>
									</Button>
								) : (
									<Link
										key={item.name}
										to={item.path}
										className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors">
										{item.name}
									</Link>
								);
							})}
							<div className="flex flex-col gap-2 mt-4">
								{user ? (
									<>
										<div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg mb-2">
											{user.role === 2 ? (
												<>
													<div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
														<User className="w-5 h-5 text-white" />
													</div>
													<span className="font-semibold">Hello, Admin</span>
												</>
											) : (
												<>
													<Avatar>
														<AvatarImage
															src={
																localStorage.getItem("googleProfilePicture") ||
																""
															}
															alt={user.name}
														/>
														<AvatarFallback className="bg-gradient-to-r from-purple-400 to-purple-500">
															<User className="w-5 h-5 text-white" />
														</AvatarFallback>
													</Avatar>
													<span className="font-semibold">
														{user.name || "User"}
													</span>
												</>
											)}
										</div>
										<Button
											variant="outline"
											className="text-red-500 border-red-500 hover:bg-red-50"
											onClick={handleLogout}>
											<LogOut className="w-4 h-4 mr-2" />
											Logout
										</Button>
									</>
								) : (
									<>
										<Button variant="outline" asChild>
											<Link to="/auth/login">Login</Link>
										</Button>
										<Button className="gradient-purple text-white" asChild>
											<Link to="/auth/register">Get Started</Link>
										</Button>
									</>
								)}
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	);
};

export default Navbar;
