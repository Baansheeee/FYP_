/** @format */

import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactFlow, {
	Node,
	Edge,
	addEdge,
	Connection,
	useNodesState,
	useEdgesState,
	Background,
	Controls,
	MiniMap,
	useReactFlow,
	MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import ServiceNode, { ServiceNodeData } from "./nodes/ServiceNode";
import DatabaseNode, { DatabaseNodeData } from "./nodes/DatabaseNode";
import GroupNode, { GroupNodeData } from "./nodes/GroupNode";
import toast from "react-hot-toast";

export interface ArchitectureData {
	nodes: Node[];
	edges: Edge[];
}

interface ArchitectureCanvasProps {
	onSave?: (data: ArchitectureData) => void;
	initialData?: ArchitectureData;
	onToolbarStateChange?: (state: {
		canUndo: boolean;
		canRedo: boolean;
	}) => void;
	onUndo?: () => void;
	onRedo?: () => void;
}

const ArchitectureCanvasContent: React.FC<ArchitectureCanvasProps> = ({
	onSave,
	initialData,
	onToolbarStateChange,
	onUndo: externalOnUndo,
	onRedo: externalOnRedo,
}) => {
	const [nodes, setNodes, onNodesChange] = useNodesState(
		initialData?.nodes || []
	);
	const [edges, setEdges, onEdgesChange] = useEdgesState(
		initialData?.edges || []
	);
	const [draggedNode, setDraggedNode] = useState<any>(null);
	const [history, setHistory] = useState<ArchitectureData[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
	const isUndoingOrRedoingRef = useRef(false);
	const reactFlowWrapper = useRef<HTMLDivElement>(null);
	const {
		project,
		getNodes,
		getEdges,
		setNodes: setFlowNodes,
		setEdges: setFlowEdges,
	} = useReactFlow();
	const firstRender = useRef(true);

	// AWS Service Categories with their config
	const serviceCategories = {
		compute: {
			name: "Compute",
			color: "#FF9900",
			services: [
				{ label: "EC2", type: "Instance" },
				{ label: "Lambda", type: "Function" },
				{ label: "ECS", type: "Container" },
				{ label: "Lightsail", type: "Server" },
				{ label: "App Runner", type: "Container Service" },
				{ label: "Batch", type: "Batch Computing" },
			],
		},
		storage: {
			name: "Storage",
			color: "#569A31",
			services: [
				{ label: "S3", type: "Object Storage" },
				{ label: "EBS", type: "Block Storage" },
				{ label: "EFS", type: "File Storage" },
				{ label: "Glacier", type: "Archive" },
				{ label: "FSx", type: "File System" },
			],
		},
		database: {
			name: "Database",
			color: "#527FFF",
			services: [
				{ label: "RDS", type: "Relational" },
				{ label: "DynamoDB", type: "NoSQL" },
				{ label: "ElastiCache", type: "Cache" },
				{ label: "Neptune", type: "Graph" },
				{ label: "DocumentDB", type: "Document" },
				{ label: "Timestream", type: "Time Series" },
			],
		},
		networking: {
			name: "Networking",
			color: "#FF5733",
			services: [
				{ label: "VPC", type: "Network" },
				{ label: "ALB", type: "Load Balancer" },
				{ label: "NLB", type: "Load Balancer" },
				{ label: "CloudFront", type: "CDN" },
				{ label: "Route 53", type: "DNS" },
				{ label: "Direct Connect", type: "Dedicated Line" },
			],
		},
		analytics: {
			name: "Analytics",
			color: "#8B5CF6",
			services: [
				{ label: "Kinesis", type: "Streaming" },
				{ label: "Athena", type: "Query" },
				{ label: "Redshift", type: "Warehouse" },
				{ label: "QuickSight", type: "BI" },
				{ label: "EMR", type: "Big Data" },
				{ label: "SageMaker", type: "ML" },
			],
		},
	};

	// History management
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			if (initialData) {
				setHistory([initialData]);
				setHistoryIndex(0);
			}
			return;
		}

		// Skip recording history if we're doing undo/redo
		if (isUndoingOrRedoingRef.current) {
			return;
		}

		const newState = { nodes, edges };
		setHistory((prevHistory) => {
			const newHistory = prevHistory.slice(0, historyIndex + 1);
			newHistory.push(newState);
			setHistoryIndex(newHistory.length - 1);
			return newHistory;
		});
	}, [nodes, edges, historyIndex]);

	// Update toolbar state
	useEffect(() => {
		onToolbarStateChange?.({
			canUndo: historyIndex > 0,
			canRedo: historyIndex < history.length - 1,
		});
	}, [historyIndex, history.length, onToolbarStateChange]);

	const handleUndo = useCallback(() => {
		setHistoryIndex((prevIndex) => {
			if (prevIndex > 0) {
				const newIndex = prevIndex - 1;
				const state = history[newIndex];
				isUndoingOrRedoingRef.current = true;
				setFlowNodes(state.nodes);
				setFlowEdges(state.edges);
				setTimeout(() => {
					isUndoingOrRedoingRef.current = false;
				}, 0);
				externalOnUndo?.();
				return newIndex;
			}
			return prevIndex;
		});
	}, [history, setFlowNodes, setFlowEdges, externalOnUndo]);

	const handleRedo = useCallback(() => {
		setHistoryIndex((prevIndex) => {
			if (prevIndex < history.length - 1) {
				const newIndex = prevIndex + 1;
				const state = history[newIndex];
				isUndoingOrRedoingRef.current = true;
				setFlowNodes(state.nodes);
				setFlowEdges(state.edges);
				setTimeout(() => {
					isUndoingOrRedoingRef.current = false;
				}, 0);
				externalOnRedo?.();
				return newIndex;
			}
			return prevIndex;
		});
	}, [history, setFlowNodes, setFlowEdges, externalOnRedo]);

	const onConnect = useCallback(
		(connection: Connection) => {
			setEdges((eds) =>
				addEdge(
					{
						...connection,
						markerEnd: { type: MarkerType.ArrowClosed },
						animated: true,
						style: { stroke: "#9333ea", strokeWidth: 2 },
					},
					eds
				)
			);
		},
		[setEdges]
	);

	// Handle dragging from component panel
	const onDragStart = (
		event: React.DragEvent,
		serviceData: any,
		category: string
	) => {
		setDraggedNode({ serviceData, category });
		event.dataTransfer.effectAllowed = "move";
	};

	const onDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	};

	const onDrop = (event: React.DragEvent) => {
		event.preventDefault();

		if (!draggedNode || !reactFlowWrapper.current) return;

		const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
		const position = project({
			x: event.clientX - reactFlowBounds.left,
			y: event.clientY - reactFlowBounds.top,
		});

		const { serviceData, category } = draggedNode;
		const categoryConfig =
			serviceCategories[category as keyof typeof serviceCategories];

		const newNode: Node<ServiceNodeData | DatabaseNodeData> = {
			id: `${category}-${Date.now()}`,
			position,
			data: {
				label: serviceData.label,
				type: serviceData.type,
				category: categoryConfig.name,
				color: categoryConfig.color,
			},
			type: category === "database" ? "database" : "service",
		};

		setNodes((nds) => [...nds, newNode]);
		setDraggedNode(null);
	};

	const handleSave = () => {
		const data: ArchitectureData = { nodes: getNodes(), edges: getEdges() };
		onSave?.(data);
	};

	// Expose undo/redo/save via window
	useEffect(() => {
		(window as any).__architectureCanvasUndo = handleUndo;
		(window as any).__architectureCanvasRedo = handleRedo;
		(window as any).__architectureCanvasSave = handleSave;
		return () => {
			delete (window as any).__architectureCanvasUndo;
			delete (window as any).__architectureCanvasRedo;
			delete (window as any).__architectureCanvasSave;
		};
	}, [handleUndo, handleRedo, handleSave]);

	const handleAddGroup = () => {
		const newNode: Node<GroupNodeData> = {
			id: `group-${Date.now()}`,
			position: { x: 250, y: 5 },
			data: {
				label: "VPC / Network Group",
				color: "#E91E63",
			},
			type: "group",
			style: {
				width: 300,
				height: 200,
				background: "#E91E63",
				opacity: 0.1,
				border: "2px dashed #E91E63",
			},
		};
		setNodes((nds) => [...nds, newNode]);
	};

	const handleDeleteNode = useCallback(
		(nodeId: string) => {
			// Remove the node
			setNodes((nds) => nds.filter((node) => node.id !== nodeId));
			// Remove any edges connected to this node
			setEdges((eds) =>
				eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
			);
		},
		[setNodes, setEdges]
	);

	// Handle delete hotkey
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Delete" || event.key === "Backspace") {
				const currentNodes = getNodes();
				const selectedNodes = currentNodes.filter((node) => node.selected);

				// Delete all selected nodes
				selectedNodes.forEach((node) => {
					handleDeleteNode(node.id);
				});
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [getNodes, handleDeleteNode]);

	// Create enhanced nodeTypes with onDelete callback
	const enhancedNodeTypes = React.useMemo(
		() => ({
			service: (props: any) => (
				<ServiceNode {...props} onDelete={handleDeleteNode} />
			),
			database: (props: any) => (
				<DatabaseNode {...props} onDelete={handleDeleteNode} />
			),
			group: (props: any) => (
				<GroupNode {...props} onDelete={handleDeleteNode} />
			),
		}),
		[handleDeleteNode]
	);

	return (
		<div className="w-full h-full flex gap-0 bg-gradient-to-br from-background via-purple-50/20 to-background">
			{/* Components Panel */}
			<div className="w-80 bg-gradient-to-b from-background/95 to-purple-50/20 border-r border-purple-200/30 overflow-y-auto shadow-xl flex flex-col backdrop-blur-sm">
				<div className="flex-1 overflow-y-auto p-5 space-y-6">
					<div className="space-y-2">
						<h3 className="text-lg font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
							AWS Services
						</h3>
						<p className="text-xs text-muted-foreground">
							Drag services to the canvas to add them
						</p>
					</div>

					{Object.entries(serviceCategories).map(([key, category]) => (
						<div key={key} className="space-y-3">
							<div className="flex items-center gap-2">
								<div
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: category.color }}
								/>
								<h4 className="text-xs font-bold text-foreground uppercase tracking-widest">
									{category.name}
								</h4>
							</div>
							<div className="space-y-2">
								{category.services.map((service) => (
									<div
										key={service.label}
										draggable
										onDragStart={(e) => onDragStart(e, service, key)}
										className="p-3 bg-card/60 border border-border/50 rounded-lg cursor-grab active:cursor-grabbing hover:border-purple-400/60 hover:bg-purple-50/30 dark:hover:bg-purple-900/20 hover:shadow-md transition-all group backdrop-blur-xs">
										<div className="flex items-start gap-3">
											<div
												className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ring-2 ring-current/20"
												style={{ backgroundColor: category.color }}
											/>
											<div className="flex-1 min-w-0">
												<div className="text-sm font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
													{service.label}
												</div>
												<div className="text-xs text-muted-foreground">
													{service.type}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Add Group Button */}
				<div className="p-4 border-t border-border/30 space-y-2">
					<button
						onClick={handleAddGroup}
						className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold border border-purple-200/40 hover:border-purple-300/60 transition-all shadow-sm hover:shadow-md">
						<span className="text-base mr-2">➕</span>
						Add Group/VPC
					</button>
				</div>
			</div>

			{/* Canvas */}
			<div className="flex-1 relative" ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onDragOver={onDragOver}
					onDrop={onDrop}
					nodeTypes={enhancedNodeTypes}
					fitView>
					<Background color="#d1d5db" gap={16} />
					<Controls />
					<MiniMap
						style={{
							backgroundColor: "hsl(var(--card))",
							border: "1px solid hsl(var(--border))",
							borderRadius: "8px",
						}}
					/>
				</ReactFlow>

				{/* Info Hint */}
				<div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-50/90 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-lg shadow-lg backdrop-blur-sm text-xs text-blue-700 dark:text-blue-300 z-10">
					ℹ️ Drag components from the left panel and connect them to build your
					architecture
				</div>
			</div>
		</div>
	);
};

export default ArchitectureCanvasContent;
