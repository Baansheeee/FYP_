/** @format */

import { Node, Edge } from "reactflow";

export interface ArchitectureData {
	nodes: Node[];
	edges: Edge[];
	metadata?: {
		name?: string;
		description?: string;
		createdAt?: string;
		updatedAt?: string;
		version?: string;
	};
}

/**
 * Export architecture as JSON file
 */
export const exportArchitecture = (
	data: ArchitectureData,
	filename = "architecture"
) => {
	const dataStr = JSON.stringify(data, null, 2);
	const dataBlob = new Blob([dataStr], { type: "application/json" });
	const url = URL.createObjectURL(dataBlob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `${filename}-${Date.now()}.json`;
	link.click();
	URL.revokeObjectURL(url);
};

/**
 * Import architecture from JSON file
 */
export const importArchitecture = (): Promise<ArchitectureData> => {
	return new Promise((resolve, reject) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = (e: any) => {
			const file = e.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (event: any) => {
					try {
						const data = JSON.parse(event.target.result);
						resolve(data);
					} catch (error) {
						reject(new Error("Invalid JSON file"));
					}
				};
				reader.onerror = () => reject(new Error("Failed to read file"));
				reader.readAsText(file);
			}
		};
		input.click();
	});
};

/**
 * Validate architecture data structure
 */
export const validateArchitecture = (data: any): data is ArchitectureData => {
	return (
		data &&
		Array.isArray(data.nodes) &&
		Array.isArray(data.edges) &&
		data.nodes.every(
			(node: any) =>
				node.id &&
				node.position &&
				typeof node.position.x === "number" &&
				typeof node.position.y === "number" &&
				node.data
		) &&
		data.edges.every((edge: any) => edge.source && edge.target)
	);
};

/**
 * Get architecture statistics
 */
export const getArchitectureStats = (data: ArchitectureData) => {
	const nodesByType: Record<string, number> = {};
	const nodesByCategory: Record<string, number> = {};

	data.nodes.forEach((node) => {
		const type = node.type || "service";
		nodesByType[type] = (nodesByType[type] || 0) + 1;

		const category = (node.data as any).category || "Unknown";
		nodesByCategory[category] = (nodesByCategory[category] || 0) + 1;
	});

	return {
		totalNodes: data.nodes.length,
		totalConnections: data.edges.length,
		nodesByType,
		nodesByCategory,
		avgConnectionsPerNode:
			data.edges.length > 0 ? data.edges.length / data.nodes.length : 0,
	};
};

/**
 * Find connected nodes
 */
export const findConnectedNodes = (nodeId: string, edges: Edge[]) => {
	const incoming = edges
		.filter((e) => e.target === nodeId)
		.map((e) => e.source);
	const outgoing = edges
		.filter((e) => e.source === nodeId)
		.map((e) => e.target);
	return { incoming, outgoing };
};

/**
 * Check if adding an edge would create a cycle
 */
export const wouldCreateCycle = (
	sourceId: string,
	targetId: string,
	edges: Edge[]
) => {
	if (sourceId === targetId) return true;

	const visited = new Set<string>();
	const stack = [targetId];

	while (stack.length > 0) {
		const current = stack.pop()!;
		if (current === sourceId) return true;
		if (visited.has(current)) continue;

		visited.add(current);
		const outgoing = edges
			.filter((e) => e.source === current)
			.map((e) => e.target);
		stack.push(...outgoing);
	}

	return false;
};

/**
 * Flatten architecture (remove groups and show all nodes)
 */
export const flattenArchitecture = (data: ArchitectureData) => {
	return {
		...data,
		nodes: data.nodes.filter((node) => node.type !== "group"),
	};
};

/**
 * Clone architecture (deep copy)
 */
export const cloneArchitecture = (data: ArchitectureData): ArchitectureData => {
	return JSON.parse(JSON.stringify(data));
};

/**
 * Merge two architectures
 */
export const mergeArchitectures = (
	arch1: ArchitectureData,
	arch2: ArchitectureData,
	offsetX = 400,
	offsetY = 400
): ArchitectureData => {
	const maxId1 = Math.max(
		...arch1.nodes.map((n) => parseInt(n.id.split("-").pop() || "0", 10)),
		0
	);

	// Offset arch2 nodes to avoid overlap
	const offsetNodes = arch2.nodes.map((node) => ({
		...node,
		id: `${node.id}-${maxId1}`,
		position: {
			x: node.position.x + offsetX,
			y: node.position.y + offsetY,
		},
	}));

	// Update edges to reference new node IDs
	const offsetEdges = arch2.edges.map((edge) => ({
		...edge,
		source: `${edge.source}-${maxId1}`,
		target: `${edge.target}-${maxId1}`,
	}));

	return {
		nodes: [...arch1.nodes, ...offsetNodes],
		edges: [...arch1.edges, ...offsetEdges],
		metadata: {
			...arch1.metadata,
			updatedAt: new Date().toISOString(),
		},
	};
};

/**
 * Get node by label or partial match
 */
export const findNodesByLabel = (data: ArchitectureData, query: string) => {
	return data.nodes.filter(
		(node) =>
			(node.data as any).label?.toLowerCase().includes(query.toLowerCase()) ||
			(node.data as any).type?.toLowerCase().includes(query.toLowerCase())
	);
};

/**
 * Generate architecture diagram description
 */
export const generateDescription = (data: ArchitectureData): string => {
	const stats = getArchitectureStats(data);
	const categories = Object.entries(stats.nodesByCategory)
		.map(([cat, count]) => `${count} ${cat}`)
		.join(", ");

	return `Architecture with ${stats.totalNodes} components (${categories}) connected by ${stats.totalConnections} connections.`;
};
