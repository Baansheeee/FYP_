/** @format */

import React, { useState, useCallback } from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import { Toaster } from "react-hot-toast";
import ArchitectureCanvasContent, {
	ArchitectureData,
} from "./ArchitectureCanvasContent";
import ArchitectureToolbar from "./ArchitectureToolbar";

interface ArchitectureCanvasWrapperProps {
	onSave?: (data: ArchitectureData) => void;
	onDelete?: () => void;
	initialData?: ArchitectureData;
	onBack?: () => void;
}

const ArchitectureCanvasWrapper: React.FC<ArchitectureCanvasWrapperProps> = ({
	onSave,
	onDelete,
	initialData,
	onBack,
}) => {
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);

	const handleToolbarStateChange = useCallback(
		(state: { canUndo: boolean; canRedo: boolean }) => {
			setCanUndo(state.canUndo);
			setCanRedo(state.canRedo);
		},
		[]
	);

	const handleUndo = () => {
		(window as any).__architectureCanvasUndo?.();
	};

	const handleRedo = () => {
		(window as any).__architectureCanvasRedo?.();
	};

	const handleImport = () => {
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
						// Emit import event
						window.dispatchEvent(
							new CustomEvent("architectureImport", { detail: data })
						);
					} catch (error) {
						console.error("Invalid JSON file");
					}
				};
				reader.readAsText(file);
			}
		};
		input.click();
	};

	const handleSave = () => {
		// Call the canvas save function which will gather nodes/edges and call onSave
		if ((window as any).__architectureCanvasSave) {
			(window as any).__architectureCanvasSave();
		}
	};

	return (
		<ReactFlowProvider>
			<div className="w-full h-full flex flex-col bg-gradient-to-br from-background via-purple-50/20 to-background">
				<Toaster
					position="top-center"
					toastOptions={{
						duration: 1000,
						style: {
							background: "#1f1f1f",
							color: "#fff",
							padding: "12px 16px",
							borderRadius: "10px",
							fontSize: "14px",
						},
						success: {
							style: { background: "#22c55e" },
						},
						error: {
							style: { background: "#ef4444" },
						},
					}}
				/>
				<ArchitectureToolbar
					onSave={handleSave}
					onDelete={onDelete}
					onExport={() => {}}
					onImport={handleImport}
					canUndo={canUndo}
					canRedo={canRedo}
					onUndo={handleUndo}
					onRedo={handleRedo}
					onBack={onBack}
				/>
				<div className="flex-1 w-full overflow-hidden">
					<ArchitectureCanvasContent
						onSave={onSave}
						initialData={initialData}
						onToolbarStateChange={handleToolbarStateChange}
						onUndo={handleUndo}
						onRedo={handleRedo}
					/>
				</div>
			</div>
		</ReactFlowProvider>
	);
};

export default ArchitectureCanvasWrapper;
