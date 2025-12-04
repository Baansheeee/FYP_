/** @format */

import { Handle, Position, NodeProps } from "reactflow";
import { Database, Trash2 } from "lucide-react";

export interface DatabaseNodeData {
	label: string;
	type: string;
	color: string;
}

interface DatabaseNodeProps extends NodeProps<DatabaseNodeData> {
	onDelete?: (nodeId: string) => void;
}

const DatabaseNode = ({ data, selected, id, onDelete }: DatabaseNodeProps) => {
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
						? "border-orange-500 shadow-xl shadow-orange-500/40 ring-2 ring-orange-400/30"
						: "border-orange-200/40"
				}
				bg-gradient-to-br from-card to-orange-50/10 dark:to-orange-900/20
				cursor-grab active:cursor-grabbing
				min-w-[160px] text-center
				hover:shadow-lg hover:border-orange-400/60 backdrop-blur-sm
				group
			`}>
			<div className="flex items-center justify-center gap-2 mb-2">
				<div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md ring-2 ring-orange-400/40">
					<Database className="w-4 h-4" />
				</div>
				<span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
					Database
				</span>
			</div>
			<div className="text-sm font-bold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
				{data.label}
			</div>
			<div className="text-xs text-muted-foreground mt-1">{data.type}</div>

			<Handle type="target" position={Position.Top} />
			<Handle type="source" position={Position.Bottom} />
			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />

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

export default DatabaseNode;
