/** @format */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PolicyFormProps {
	onSubmit: (data: PolicyFormData) => void;
	initialData?: PolicyFormData;
	isLoading?: boolean;
}

export interface PolicyFormData {
	title: string;
	description: string;
	version: string;
	status?: "draft" | "published" | "archived";
}

export default function PolicyForm({
	onSubmit,
	initialData,
	isLoading = false,
}: PolicyFormProps) {
	const [formData, setFormData] = useState<PolicyFormData>(
		initialData || {
			title: "",
			description: "",
			version: "1.0",
			status: "draft",
		}
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Policy Form</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-2">
							Policy Title
						</label>
						<Input
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							placeholder="Enter policy title"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">
							Description
						</label>
						<textarea
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							placeholder="Enter policy description"
							required
							className="w-full p-2 border rounded"
							rows={5}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Version</label>
						<Input
							value={formData.version}
							onChange={(e) =>
								setFormData({ ...formData, version: e.target.value })
							}
							placeholder="e.g., 1.0"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Status</label>
						<select
							value={formData.status}
							onChange={(e) =>
								setFormData({
									...formData,
									status: e.target.value as "draft" | "published" | "archived",
								})
							}
							className="w-full p-2 border rounded">
							<option value="draft">Draft</option>
							<option value="published">Published</option>
							<option value="archived">Archived</option>
						</select>
					</div>

					<Button type="submit" disabled={isLoading} className="w-full">
						{isLoading ? "Saving..." : "Save Policy"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
