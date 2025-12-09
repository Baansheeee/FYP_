/** @format */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlanFormProps {
	onSubmit: (data: PlanFormData) => void;
	initialData?: PlanFormData;
	isLoading?: boolean;
}

export interface PlanFormData {
	name: string;
	price: string | number;
	features: string[];
}

export default function PlanForm({
	onSubmit,
	initialData,
	isLoading = false,
}: PlanFormProps) {
	const [formData, setFormData] = useState<PlanFormData>(
		initialData || {
			name: "",
			price: "",
			features: [],
		}
	);
	const [featureInput, setFeatureInput] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const addFeature = () => {
		if (featureInput.trim()) {
			setFormData({
				...formData,
				features: [...formData.features, featureInput.trim()],
			});
			setFeatureInput("");
		}
	};

	const removeFeature = (index: number) => {
		setFormData({
			...formData,
			features: formData.features.filter((_, i) => i !== index),
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Plan Form</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-2">Plan Name</label>
						<Input
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							placeholder="Enter plan name"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Price</label>
						<Input
							type="number"
							value={formData.price}
							onChange={(e) =>
								setFormData({ ...formData, price: e.target.value })
							}
							placeholder="Enter price"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Features</label>
						<div className="flex gap-2 mb-2">
							<Input
								value={featureInput}
								onChange={(e) => setFeatureInput(e.target.value)}
								placeholder="Enter feature"
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										addFeature();
									}
								}}
							/>
							<Button type="button" onClick={addFeature} variant="outline">
								Add
							</Button>
						</div>
						<div className="space-y-2">
							{formData.features.map((feature, index) => (
								<div
									key={index}
									className="flex items-center justify-between bg-gray-100 p-2 rounded">
									<span>{feature}</span>
									<button
										type="button"
										onClick={() => removeFeature(index)}
										className="text-red-600 hover:text-red-800">
										Remove
									</button>
								</div>
							))}
						</div>
					</div>

					<Button type="submit" disabled={isLoading} className="w-full">
						{isLoading ? "Saving..." : "Save Plan"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
