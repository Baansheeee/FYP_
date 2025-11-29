/** @format */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { CheckCircle2, X, ArrowRight } from "lucide-react";

const Pricing = () => {
	const plans = [
		{
			name: "Starter",
			price: "$29",
			period: "/month",
			description: "Perfect for small projects and learning",
			badge: null,
			features: [
				"Up to 5 projects",
				"Basic chatbot (10 queries/month)",
				"1 architecture design",
				"Email support",
				"1GB storage",
				"Community access",
			],
			excluded: [
				"Priority support",
				"Advanced analytics",
				"Custom integrations",
			],
			cta: "Get Started",
			ctaVariant: "outline" as const,
		},
		{
			name: "Professional",
			price: "$99",
			period: "/month",
			description: "For growing teams and production deployments",
			badge: "POPULAR",
			features: [
				"Unlimited projects",
				"Advanced chatbot (1000 queries/month)",
				"Unlimited architecture designs",
				"Priority email & chat support",
				"50GB storage",
				"Advanced cost optimization",
				"Real-time monitoring",
				"Version control & collaboration",
				"API access",
			],
			excluded: ["24/7 phone support", "Custom SLA"],
			cta: "Start Free Trial",
			ctaVariant: "default" as const,
		},
		{
			name: "Enterprise",
			price: "Custom",
			period: "",
			description: "For large-scale deployments with custom needs",
			badge: null,
			features: [
				"Everything in Professional",
				"Unlimited queries & storage",
				"Dedicated account manager",
				"24/7 phone & email support",
				"Custom integrations",
				"Advanced security & compliance",
				"SLA guarantee (99.9%)",
				"Custom training & onboarding",
				"On-premise deployment option",
			],
			excluded: [],
			cta: "Contact Sales",
			ctaVariant: "outline" as const,
		},
	];

	const comparisonFeatures = [
		"Projects",
		"Chatbot Queries/Month",
		"Architecture Designs",
		"Storage",
		"Support",
		"Cost Optimization",
		"Real-time Monitoring",
		"API Access",
		"Advanced Security",
		"Dedicated Manager",
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-20 text-center ">
				<div className="p-8 py-28 rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent border border-purple-500/10 ">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
						Simple, Transparent <span className="text-gradient">Pricing</span>
					</h1>
					<p
						className="text-xl text-muted-foreground mb-8 animate-fade-in"
						style={{ animationDelay: "100ms" }}>
						Choose the perfect plan for your AWS infrastructure needs. Scale as
						you grow.
					</p>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className="container mx-auto px-4 py-6">
				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
					{plans.map((plan, index) => (
						<div
							key={plan.name}
							className={`relative rounded-2xl border transition-all duration-300 animate-fade-in hover:scale-105 ${
								plan.badge
									? "border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-purple-500/5 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
									: "border-border/50 bg-secondary/30 hover:border-border/80 hover:bg-secondary/50 hover:shadow-lg"
							}`}
							style={{ animationDelay: `${index * 100}ms` }}>
							{/* Badge */}
							{plan.badge && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
									<Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 text-sm">
										{plan.badge}
									</Badge>
								</div>
							)}

							<div className="p-8 space-y-6">
								{/* Plan Name & Price */}
								<div>
									<h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
									<p className="text-sm text-muted-foreground mb-4">
										{plan.description}
									</p>
									<div className="flex items-baseline gap-1">
										<span className="text-4xl font-bold">{plan.price}</span>
										<span className="text-muted-foreground">{plan.period}</span>
									</div>
								</div>

								{/* CTA Button */}
								<Button
									asChild
									size="lg"
									className="w-full"
									variant={plan.ctaVariant}>
									<Link
										to={plan.cta === "Contact Sales" ? "/" : "/auth/register"}>
										{plan.cta}
										<ArrowRight className="ml-2 w-4 h-4" />
									</Link>
								</Button>

								{/* Features */}
								<div className="space-y-3 border-t border-border/30 pt-6">
									{plan.features.map((feature, fIndex) => (
										<div
											key={feature}
											className="flex items-start gap-3 animate-fade-in"
											style={{ animationDelay: `${400 + fIndex * 30}ms` }}>
											<CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">{feature}</span>
										</div>
									))}
									{plan.excluded.map((feature) => (
										<div
											key={feature}
											className="flex items-start gap-3 opacity-50">
											<X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
											<span className="text-sm">{feature}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* FAQ Section */}
			<section className="container mx-auto px-4 py-16 max-w-2xl">
				<h2 className="text-3xl font-bold text-center mb-12">
					Frequently Asked Questions
				</h2>

				<div className="space-y-6">
					{[
						{
							q: "Can I change plans anytime?",
							a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.",
						},
						{
							q: "Is there a free trial?",
							a: "Yes, the Professional plan includes a 14-day free trial. No credit card required to start.",
						},
						{
							q: "What payment methods do you accept?",
							a: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.",
						},
						{
							q: "Do you offer annual billing discounts?",
							a: "Yes, annual plans come with a 20% discount compared to monthly billing.",
						},
						{
							q: "Is there a refund policy?",
							a: "We offer a 30-day money-back guarantee if you're not satisfied with our service.",
						},
					].map((faq, index) => (
						<div
							key={index}
							className="p-6 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/30 transition-all duration-300 animate-fade-in hover:scale-102 hover:shadow-md cursor-pointer"
							style={{ animationDelay: `${index * 50}ms` }}>
							<h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
							<p className="text-muted-foreground">{faq.a}</p>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-12 text-center animate-fade-in">
					<h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
					<p className="text-lg text-muted-foreground mb-8">
						Join thousands of developers managing their AWS infrastructure with
						AWSOME
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="gradient-purple text-white" asChild>
							<Link to="/auth/register">
								Get Started Free
								<ArrowRight className="ml-2 w-5 h-5" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link to="/#features">View Features</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Footer Spacing */}
			<div className="h-8"></div>
		</div>
	);
};

export default Pricing;
