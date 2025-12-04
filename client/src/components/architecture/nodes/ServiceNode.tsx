/** @format */

import { Handle, Position, NodeProps } from "reactflow";
import { Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ServiceNodeData {
	label: string;
	type: string;
	category: string;
	icon: React.ReactNode;
	color: string;
}

interface ServiceNodeProps extends NodeProps<ServiceNodeData> {
	onDelete?: (nodeId: string) => void;
}

const ServiceNode = ({ data, selected, id, onDelete }: ServiceNodeProps) => {
	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onDelete) {
			onDelete(id);
		}
	};

	return (
		<div
			className={`
				px-4 py-3 rounded-xl border-2 transition-all
				${
					selected
						? "border-purple-500 shadow-xl shadow-purple-500/40 ring-2 ring-purple-400/30"
						: "border-purple-200/40"
				}
				bg-gradient-to-br from-card to-purple-50/10 dark:to-purple-900/20
				cursor-grab active:cursor-grabbing
				min-w-[160px] text-center
				hover:shadow-lg hover:border-purple-400/60 backdrop-blur-sm
				group
			`}>
			<div className="flex items-center justify-center gap-2 mb-2">
				<div
					className={`w-8 h-8 flex items-center justify-center rounded-lg text-white text-sm font-bold shadow-md ring-2`}
					style={{
						backgroundColor: data.color,
						boxShadow: `0 0 0 2px ${data.color}40`,
					}}>
					{data.icon}
				</div>
				<span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
					{data.category}
				</span>
			</div>
			<div className="text-sm font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
				{data.label}
			</div>
			<div className="text-xs text-muted-foreground mt-1">{data.type}</div>

			{/* Input/Output handles */}
			<Handle type="target" position={Position.Top} />
			<Handle type="source" position={Position.Bottom} />
			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />

			{/* Delete button on hover */}
			{selected && (
				<button
					onClick={handleDelete}
					className="absolute -top-2 -right-2 p-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-red-500/30 ring-2 ring-background"
					title="Delete node">
					<Trash2 className="w-3.5 h-3.5" />
				</button>
			)}
		</div>
	);
};

export default ServiceNode;
