'use client';
import { KeywordData } from '@/app/keywords/[id]/page';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlow,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';

const NODE_WIDTH = 140;
const GAP = 40;
const STEP = NODE_WIDTH + GAP;
const Y_POSITION = 130;

const createGraph = (relatedKeywords: { id: string; term: string }[]): Node[] => {
  const count = relatedKeywords.length;
  const totalWidth = (count - 1) * STEP;
  const startX = -totalWidth / 2;

  return relatedKeywords.map((keyword, index) => ({
    id: keyword.id,
    position: {
      x: startX + STEP * index,
      y: Y_POSITION,
    },
    data: { label: keyword.term },
  }));
};

interface GraphProps extends KeywordData {
  onNodeClick?: (nodeId: string) => void;
}

export default function Graph({ keyword, related, onNodeClick }: GraphProps) {
  const relatedNodes = createGraph(related);

  const initialNodes: Node[] = [
    { id: keyword.id, position: { x: 0, y: 0 }, data: { label: keyword.term } },
    ...relatedNodes,
  ];

  const initialEdges: Edge[] = related.map((rk) => ({
    id: `${keyword.id}-${rk.id}`,
    source: keyword.id,
    target: rk.id,
    markerEnd: { type: MarkerType.ArrowClosed },
  }));

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((edges) => applyEdgeChanges(changes, edges)),
    [],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((edges) => addEdge(params, edges)),
    [],
  );

  // ✅ Handle clicks on child nodes
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Only trigger callback for child nodes (not main node)
      if (node.id !== keyword.id && onNodeClick) {
        onNodeClick(node.id);
      }
    },
    [keyword.id, onNodeClick],
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
      />
    </div>
  );
}
