/** @format */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import {
	Users,
	Target,
	Lightbulb,
	Heart,
	ArrowRight,
	Github,
	Linkedin,
	Mail,
} from "lucide-react";

const AboutUs = () => {
	const teamMembers = [
		{
			name: "Muhammad Mughees Ul Hassan",
			role: "DevOps Engineer",
			bio: "Cloud infrastructure specialist with expertise in AWS deployment and automation",
			image: "👨‍💼",
			socials: {
				github: "#",
				linkedin: "#",
				email: "mughees@awsome.io",
			},
		},
		{
			name: "Muhammad Daud Bin Rizwan",
			role: "MERN Stack Developer",
			bio: "Full-stack developer focused on creating beautiful, responsive user interfaces and building web applications and APIs",
			image: "👨‍💻",
			socials: {
				github: "#",
				linkedin: "#",
				email: "daud@awsome.io",
			},
		},
		{
			name: "Shayan Ahmed",
			role: "MERN Stack Developer",
			bio: "Full-stack developer passionate about building scalable web applications and APIs",
			image: "👨‍💻",
			socials: {
				github: "#",
				linkedin: "#",
				email: "shayan@awsome.io",
			},
		},
	];

	const values = [
		{
			icon: Lightbulb,
			title: "Innovation",
			description:
				"We constantly push the boundaries of what's possible with AI and cloud technology",
		},
		{
			icon: Target,
			title: "Reliability",
			description:
				"Your infrastructure deserves to be dependable and secure. We deliver on that promise",
		},
		{
			icon: Heart,
			title: "Customer Focus",
			description:
				"Your success is our success. We're committed to supporting your goals",
		},
		{
			icon: Users,
			title: "Collaboration",
			description:
				"Great things happen when talented people work together towards a shared vision",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background ">
			<Navbar />

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-20 text-center ">
				<div className="p-8 py-28 rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent border border-purple-500/10 ">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
						About <span className="text-gradient">AWSOME</span>
					</h1>
					<p
						className="text-xl text-muted-foreground mb-8 animate-fade-in"
						style={{ animationDelay: "100ms" }}>
						Empowering developers and enterprises to build, deploy, and manage
						AWS infrastructure with AI-driven intelligence
					</p>
				</div>
			</section>

			{/* Mission Section */}
			<section className="container mx-auto max-w-7xl py-6">
				<div className="p-8 py-14 rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent border border-purple-500/10 ">
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
						<div
							className="animate-fade-in"
							style={{ animationDelay: "200ms" }}>
							<h2 className="text-3xl font-bold mb-4">Our Mission</h2>
							<p className="text-lg text-muted-foreground mb-4">
								AWSOME was founded with a simple but powerful vision: to
								democratize AWS infrastructure management by combining the power
								of artificial intelligence with intuitive design tools.
							</p>
							<p className="text-lg text-muted-foreground mb-6">
								We believe that building and managing cloud infrastructure
								should be accessible to everyone, from solo developers to
								enterprise teams. Our platform eliminates complexity and
								empowers you to focus on what matters most.
							</p>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
										<div className="w-2 h-2 rounded-full bg-green-500"></div>
									</div>
									<span className="font-medium">Founded in 2024</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
										<div className="w-2 h-2 rounded-full bg-green-500"></div>
									</div>
									<span className="font-medium">3 passionate engineers</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
										<div className="w-2 h-2 rounded-full bg-green-500"></div>
									</div>
									<span className="font-medium">Backed by innovation</span>
								</div>
							</div>
						</div>

						<div
							className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8 animate-fade-in"
							style={{ animationDelay: "300ms" }}>
							<div className="text-center">
								<div className="text-6xl mb-4">🚀</div>
								<p className="text-lg font-semibold mb-2">Growing Together</p>
								<p className="text-muted-foreground">
									Every day, thousands of developers trust AWSOME to manage
									their AWS infrastructure efficiently and securely.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4 animate-fade-in">
						Our Values
					</h2>
					<p
						className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in"
						style={{ animationDelay: "100ms" }}>
						These core values guide every decision we make and shape our company
						culture
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
					{values.map((value, index) => {
						const Icon = value.icon;
						return (
							<div
								key={value.title}
								className="p-6 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-lg"
								style={{ animationDelay: `${200 + index * 50}ms` }}>
								<div className="mb-4">
									<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
										<Icon className="w-6 h-6 text-white" />
									</div>
								</div>
								<h3 className="text-lg font-semibold mb-2">{value.title}</h3>
								<p className="text-sm text-muted-foreground">
									{value.description}
								</p>
							</div>
						);
					})}
				</div>
			</section>

			{/* Team Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4 animate-fade-in">
						Meet Our Team
					</h2>
					<p
						className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in"
						style={{ animationDelay: "100ms" }}>
						Talented engineers dedicated to building the future of AWS
						management
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{teamMembers.map((member, index) => (
						<div
							key={member.name}
							className="p-6 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-lg text-center"
							style={{ animationDelay: `${300 + index * 100}ms` }}>
							{/* Avatar */}
							<div className="text-6xl mb-4">{member.image}</div>

							{/* Info */}
							<h3 className="text-xl font-bold mb-1">{member.name}</h3>
							<p className="text-sm font-medium text-purple-600 mb-3">
								{member.role}
							</p>
							<p className="text-sm text-muted-foreground mb-6">{member.bio}</p>

							{/* Socials */}
							<div className="flex items-center justify-center gap-3">
								<a
									href={member.socials.github}
									className="w-10 h-10 rounded-lg bg-secondary/30 hover:bg-secondary/60 flex items-center justify-center transition-colors"
									title="GitHub">
									<Github className="w-5 h-5" />
								</a>
								<a
									href={member.socials.linkedin}
									className="w-10 h-10 rounded-lg bg-secondary/30 hover:bg-secondary/60 flex items-center justify-center transition-colors"
									title="LinkedIn">
									<Linkedin className="w-5 h-5" />
								</a>
								<a
									href={`mailto:${member.socials.email}`}
									className="w-10 h-10 rounded-lg bg-secondary/30 hover:bg-secondary/60 flex items-center justify-center transition-colors"
									title="Email">
									<Mail className="w-5 h-5" />
								</a>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Timeline Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4 animate-fade-in">
						Our Journey
					</h2>
				</div>

				<div className="max-w-2xl mx-auto space-y-6">
					{[
						{
							year: "2024 Q1",
							event:
								"AWSOME is founded with a vision to simplify AWS management",
						},
						{
							year: "2024 Q2",
							event:
								"Launch alpha version with AI chatbot and architecture designer",
						},
						{
							year: "2024 Q3",
							event:
								"Add cost intelligence and performance monitoring features",
						},
						{
							year: "2024 Q4",
							event: "Public release and rapid user adoption begins",
						},
					].map((milestone, index) => (
						<div
							key={index}
							className="flex gap-6 animate-fade-in"
							style={{ animationDelay: `${400 + index * 50}ms` }}>
							<div className="flex flex-col items-center">
								<div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
								{index < 3 && (
									<div className="w-1 h-16 bg-gradient-to-b from-purple-500/50 to-transparent mt-2"></div>
								)}
							</div>
							<div className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5 flex-1">
								<p className="text-sm font-semibold text-purple-600 mb-1">
									{milestone.year}
								</p>
								<p className="font-medium">{milestone.event}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-12 text-center animate-fade-in">
					<h2 className="text-3xl font-bold mb-4">Join Us on This Journey</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						Be part of the revolution in AWS infrastructure management
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="gradient-purple text-white" asChild>
							<Link to="/auth/register">
								Get Started Free
								<ArrowRight className="ml-2 w-5 h-5" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link to="/contact">Contact Us</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Footer Spacing */}
			<div className="h-8"></div>
		</div>
	);
};

export default AboutUs;
