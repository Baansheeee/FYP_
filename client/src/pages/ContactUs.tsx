/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import { useInView } from "@/hooks/useInView";
import toast from "react-hot-toast";
import {
	Mail,
	Phone,
	MapPin,
	MessageSquare,
	Clock,
	ArrowRight,
} from "lucide-react";

const ContactUs = () => {
	const heroRef = useInView({ threshold: 0.2, triggerOnce: true });
	const contactFormRef = useInView({ threshold: 0.1, triggerOnce: true });
	const contactInfoRef = useInView({ threshold: 0.1, triggerOnce: true });
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.name ||
			!formData.email ||
			!formData.subject ||
			!formData.message
		) {
			toast.error("Please fill in all fields");
			return;
		}

		setLoading(true);
		try {
			// Simulate form submission
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success("Message sent successfully! We'll get back to you soon.");
			setFormData({ name: "", email: "", subject: "", message: "" });
		} catch (error) {
			toast.error("Failed to send message. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const contactInfo = [
		{
			icon: Mail,
			title: "Email",
			value: "mdaud9062@gmail.com",
			description: "Send us an email anytime",
			link: "mailto:mdaud9062@gmail.com",
		},
		{
			icon: Phone,
			title: "Phone",
			value: "+92 312 3456789",
			description: "Available 9 AM - 6 PM EST",
			link: "tel:+923123456789",
		},
		{
			icon: MapPin,
			title: "Address",
			value: "Islamabad, Pakistan",
			description: "Tech Hub Central",
			link: "#",
		},
		{
			icon: MessageSquare,
			title: "Chat",
			value: "Live Chat Support",
			description: "Instant help from our team",
			link: "#",
		},
	];

	const faqs = [
		{
			q: "What's the average response time?",
			a: "We typically respond to inquiries within 24 hours on business days.",
		},
		{
			q: "Do you offer phone support?",
			a: "Yes, phone support is available for Professional and Enterprise plans during business hours.",
		},
		{
			q: "Can I schedule a demo?",
			a: "Absolutely! Fill out the contact form and mention you'd like a demo, or email us directly.",
		},
		{
			q: "What's your support timezone?",
			a: "We operate in EST timezone, but support requests are handled globally.",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />

			{/* Hero Section */}
			<section
				ref={heroRef.ref}
				className={`container mx-auto px-4 py-20 text-center transition-all duration-700 ${
					heroRef.isInView ? "opacity-100" : "opacity-0"
				}`}>
				<div className="p-8 py-28 rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent border border-purple-500/10 ">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
						Get in Touch with <span className="text-gradient">Our Team</span>
					</h1>
					<p
						className="text-xl text-muted-foreground mb-8 animate-fade-in"
						style={{ animationDelay: "100ms" }}>
						Have questions? We'd love to hear from you. Send us a message and
						we'll respond as soon as possible.
					</p>
				</div>
			</section>

			{/* Contact Methods */}
			<section
				ref={contactInfoRef.ref}
				className={`container mx-auto px-4 py-12 transition-all duration-700 ${
					contactInfoRef.isInView ? "opacity-100" : "opacity-0"
				}`}>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
					{contactInfo.map((info, index) => {
						const Icon = info.icon;
						return (
							<a
								key={info.title}
								href={info.link}
								className="p-6 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-lg hover:border-purple-500/50"
								style={{ animationDelay: `${index * 50}ms` }}>
								<div className="mb-4">
									<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
										<Icon className="w-6 h-6 text-white" />
									</div>
								</div>
								<h3 className="text-lg font-semibold mb-2">{info.title}</h3>
								<p className="text-sm font-medium text-purple-600 mb-2">
									{info.value}
								</p>
								<p className="text-sm text-muted-foreground">
									{info.description}
								</p>
							</a>
						);
					})}
				</div>
			</section>

			{/* Contact Form & Info */}
			<section
				ref={contactFormRef.ref}
				className={`container mx-auto px-4 py-8 transition-all duration-700 ${
					contactFormRef.isInView ? "opacity-100" : "opacity-0"
				}`}>
				<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent border border-purple-500/10">
					{/* Form */}
					<div className="animate-fade-in " style={{ animationDelay: "200ms" }}>
						<h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<Label className="text-foreground font-medium mb-2 block">
									Full Name
								</Label>
								<Input
									type="text"
									name="name"
									placeholder="John Doe"
									value={formData.name}
									onChange={handleInputChange}
									className="h-12 border-border/50 focus:ring-2 focus:ring-purple-500"
								/>
							</div>

							<div>
								<Label className="text-foreground font-medium mb-2 block">
									Email Address
								</Label>
								<Input
									type="email"
									name="email"
									placeholder="you@example.com"
									value={formData.email}
									onChange={handleInputChange}
									className="h-12 border-border/50 focus:ring-2 focus:ring-purple-500"
								/>
							</div>

							<div>
								<Label className="text-foreground font-medium mb-2 block">
									Subject
								</Label>
								<Input
									type="text"
									name="subject"
									placeholder="How can we help?"
									value={formData.subject}
									onChange={handleInputChange}
									className="h-12 border-border/50 focus:ring-2 focus:ring-purple-500"
								/>
							</div>

							<div>
								<Label className="text-foreground font-medium mb-2 block">
									Message
								</Label>
								<textarea
									name="message"
									placeholder="Tell us more about your inquiry..."
									value={formData.message}
									onChange={handleInputChange}
									rows={6}
									className="w-full px-4 py-3 rounded-lg border border-border/50 bg-secondary/20 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
								/>
							</div>

							<Button
								type="submit"
								disabled={loading}
								className="w-full h-12 gradient-purple text-white font-medium rounded-lg hover:shadow-lg transition-all">
								{loading ? "Sending..." : "Send Message"}
								<ArrowRight className="ml-2 w-4 h-4" />
							</Button>
						</form>
					</div>

					{/* Info & FAQs */}
					<div
						className="space-y-8 animate-fade-in"
						style={{ animationDelay: "300ms" }}>
						{/* Quick Info */}
						<div className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5">
							<div className="flex items-start gap-4 mb-6">
								<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
									<Clock className="w-5 h-5 text-purple-500" />
								</div>
								<div>
									<h3 className="font-semibold mb-1">Response Time</h3>
									<p className="text-sm text-muted-foreground">
										We typically respond within 24 hours on business days
									</p>
								</div>
							</div>
						</div>

						{/* FAQs */}
						<div>
							<h3 className="text-xl font-semibold mb-4">Quick FAQs</h3>
							<div className="space-y-4">
								{faqs.map((faq, index) => (
									<div
										key={index}
										className="p-4 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/30 transition-colors animate-fade-in"
										style={{ animationDelay: `${400 + index * 50}ms` }}>
										<p className="font-semibold text-sm mb-2">{faq.q}</p>
										<p className="text-sm text-muted-foreground">{faq.a}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-12 text-center animate-fade-in">
					<h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						Start your free trial today and experience the power of AI-driven
						AWS management
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="gradient-purple text-white" asChild>
							<Link to="/auth/register">
								Start Free Trial
								<ArrowRight className="ml-2 w-5 h-5" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link to="/pricing">View Pricing</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Footer Spacing */}
			<div className="h-8"></div>
		</div>
	);
};

export default ContactUs;
