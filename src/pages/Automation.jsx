import React, { useState, useCallback } from 'react';
import ReactFlow, { Position, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

import PageContainer from '../common/PageContainer';

import PageBody from '../common/PageBody';
import AutomationNode from '../common/AutomationNode';

const body = `calc(100vh - 110px)`;

const initialNodes = [
  {
    id: 'a',
    data: { type: 'input', ressource: 'steel' },
    position: { x: 0, y: 0 },
    type: 'custom',
  },
  {
    id: 'b',
    data: { type: 'none', ressource: 'gold' },
    position: { x: 200, y: 100 },
    type: 'custom',
  },
  {
    id: 'c',
    data: { type: 'output', ressource: 'crystal' },
    position: { x: 400, y: 0 },
    type: 'custom',
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: 'a',
    target: 'b',
  },
];

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};
const connectionLineStyle = { stroke: 'white' };

const nodeTypes = { custom: AutomationNode };

export default function Automation() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <PageContainer>
      <PageBody type={'header'} height={body}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          defaultEdgeOptions={edgeOptions}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          style={
            {
              // backgroundColor: '#D3D2E5',
            }
          }
          connectionLineStyle={connectionLineStyle}
        >
          {/* <Background /> */}
          {/* <Controls /> */}
        </ReactFlow>
      </PageBody>
    </PageContainer>
  );
}
