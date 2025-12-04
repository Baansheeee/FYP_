/** @format */

import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Trash2 } from "lucide-react";

export interface GroupNodeData {
	label: string;
	color: string;
}

interface GroupNodeProps extends NodeProps<GroupNodeData> {
	onDelete?: (nodeId: string) => void;
}

const GroupNode = ({ data, selected, id, onDelete }: GroupNodeProps) => {
	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onDelete) {
			onDelete(id);
		}
	};
	return (
		<div
			className={`
				px-6 py-4 rounded-xl border-2 transition-all
				${selected ? `shadow-xl ring-2` : "border-dashed opacity-80"}
				cursor-grab active:cursor-grabbing
				min-w-[240px] min-h-[120px]
				hover:shadow-lg hover:opacity-100 backdrop-blur-sm
				group
			`}
			style={{
				borderColor: data.color,
				backgroundColor: data.color + "08",
				boxShadow: selected
					? `0 0 0 2px ${data.color}30, 0 20px 25px -5px rgba(0, 0, 0, 0.1)`
					: undefined,
			}}>
			<div
				className="text-sm font-bold transition-colors"
				style={{ color: data.color }}>
				{data.label}
			</div>
			<div className="text-xs mt-2 opacity-60" style={{ color: data.color }}>
				Drag components here
			</div>
			{selected && (
				<button
					onClick={handleDelete}
					className="absolute -top-2 -right-2 p-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-red-500/30 ring-2 ring-background"
					title="Delete node">
					<Trash2 className="w-3.5 h-3.5" />
				</button>
			)}
			<Handle type="target" position={Position.Top} />
			<Handle type="source" position={Position.Bottom} />
			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />
		</div>
	);
};

export default GroupNode;
