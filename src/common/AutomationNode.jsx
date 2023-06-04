import { Stack } from '@mui/material';
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import CustomIcon from './CustomIcon';

function AutomationNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div style={{ width: '100px', height: '50px', border: '1px solid white', padding: '5px', borderRadius: '5px' }}>
      <Stack direction='row' alignItems='center' justifyContent='center' style={{ height: '100%' }}>
        <CustomIcon size={30} icon={data.ressource} />
      </Stack>

      {data.type !== 'input' && <Handle type='target' position={Position.Left} id='a' isConnectable={true} />}
      {data.type !== 'output' && <Handle type='source' position={Position.Right} id='b' isConnectable={true} />}
    </div>
  );
}

export default AutomationNode;
