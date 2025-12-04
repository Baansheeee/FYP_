/** @format */

import React from "react";
import { useReactFlow } from "reactflow";
import {
	Save,
	ZoomIn,
	ZoomOut,
	Undo2,
	Redo2,
	Grid3X3,
	Download,
	Upload,
	Trash2,
	ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArchitectureToolbarProps {
	onSave?: () => void;
	onDelete?: () => void;
	onExport?: () => void;
	onImport?: () => void;
	canUndo?: boolean;
	canRedo?: boolean;
	onUndo?: () => void;
	onRedo?: () => void;
	onBack?: () => void;
}

const ArchitectureToolbar: React.FC<ArchitectureToolbarProps> = ({
	onSave,
	onDelete,
	onExport,
	onImport,
	canUndo = false,
	canRedo = false,
	onUndo,
	onRedo,
	onBack,
}) => {
	const { getNodes, getEdges, fitView, zoomIn, zoomOut } = useReactFlow();

	const handleZoomIn = () => {
		zoomIn();
	};

	const handleZoomOut = () => {
		zoomOut();
	};

	const handleFitView = () => {
		fitView();
	};

	const handleExport = () => {
		const data = {
			nodes: getNodes(),
			edges: getEdges(),
			timestamp: new Date().toISOString(),
		};
		const dataStr = JSON.stringify(data, null, 2);
		const dataBlob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(dataBlob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `architecture-${Date.now()}.json`;
		link.click();
		URL.revokeObjectURL(url);
		onExport?.();
	};

	const handleSaveClick = () => {
		// Call the canvas save function if available, otherwise call onSave directly
		if ((window as any).__architectureCanvasSave) {
			(window as any).__architectureCanvasSave();
		} else if (onSave) {
			onSave();
		}
	};

	return (
		<div className="border-b border-purple-200/30 bg-gradient-to-r from-background via-purple-50/50 to-background backdrop-blur-xl sticky top-0 z-20 p-4 shadow-lg shadow-purple-500/5">
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="sm"
							onClick={onBack}
							className="hover:bg-purple-500/20 hover:text-purple-600 transition-all">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back
						</Button>
						<div className="space-y-1">
							<h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
								Architecture Canvas
							</h1>
							<p className="text-sm text-muted-foreground">
								Drag AWS services and build your cloud architecture
							</p>
						</div>
					</div>
					<div className="flex gap-1 items-center">
						{/* Undo/Redo Group */}
						<div className="flex gap-1 bg-secondary/40 backdrop-blur-sm rounded-lg p-1 border border-border/30">
							<Button
								variant="ghost"
								size="sm"
								onClick={onUndo}
								disabled={!canUndo}
								title="Undo (Ctrl+Z)"
								className="hover:bg-purple-500/20 hover:text-purple-600 transition-all">
								<Undo2 className="w-4 h-4" />
							</Button>
							<div className="w-px bg-border/30" />
							<Button
								variant="ghost"
								size="sm"
								onClick={onRedo}
								disabled={!canRedo}
								title="Redo (Ctrl+Y)"
								className="hover:bg-purple-500/20 hover:text-purple-600 transition-all">
								<Redo2 className="w-4 h-4" />
							</Button>
						</div>

						<div className="border-l border-border/30 mx-2" />

						{/* Zoom Group */}
						<div className="flex gap-1 bg-secondary/40 backdrop-blur-sm rounded-lg p-1 border border-border/30">
							<Button
								variant="ghost"
								size="sm"
								onClick={handleZoomOut}
								title="Zoom Out"
								className="hover:bg-blue-500/20 hover:text-blue-600 transition-all">
								<ZoomOut className="w-4 h-4" />
							</Button>
							<div className="w-px bg-border/30" />
							<Button
								variant="ghost"
								size="sm"
								onClick={handleZoomIn}
								title="Zoom In"
								className="hover:bg-blue-500/20 hover:text-blue-600 transition-all">
								<ZoomIn className="w-4 h-4" />
							</Button>
							<div className="w-px bg-border/30" />
							<Button
								variant="ghost"
								size="sm"
								onClick={handleFitView}
								title="Fit View"
								className="hover:bg-blue-500/20 hover:text-blue-600 transition-all">
								<Grid3X3 className="w-4 h-4" />
							</Button>
						</div>

						<div className="border-l border-border/30 mx-2" />

						{/* Import/Export Group */}
						<div className="flex gap-1 bg-secondary/40 backdrop-blur-sm rounded-lg p-1 border border-border/30">
							<Button
								variant="ghost"
								size="sm"
								onClick={handleExport}
								title="Export Architecture"
								className="hover:bg-amber-500/20 hover:text-amber-600 transition-all text-xs">
								<Download className="w-4 h-4 mr-1" />
								Export
							</Button>
							<div className="w-px bg-border/30" />
							<Button
								variant="ghost"
								size="sm"
								onClick={onImport}
								title="Import Architecture"
								className="hover:bg-amber-500/20 hover:text-amber-600 transition-all text-xs">
								<Upload className="w-4 h-4 mr-1" />
								Import
							</Button>
						</div>

						<div className="border-l border-border/30 mx-2" />

						{/* Delete Button */}
						<Button
							variant="ghost"
							size="sm"
							onClick={onDelete}
							title="Delete Architecture"
							className="bg-red-500/10 hover:bg-red-500/20 text-red-600 hover:text-red-700 transition-all border border-red-500/20">
							<Trash2 className="w-4 h-4 mr-1" />
							Delete
						</Button>

						{/* Save Button */}
						<Button
							onClick={handleSaveClick}
							className="ml-2 bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all border-0">
							<Save className="w-4 h-4 mr-2" />
							Save
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArchitectureToolbar;
