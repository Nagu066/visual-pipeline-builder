// delayNode.js
// New node: Add delay to pipeline execution

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const config = {
    title: 'Delay',
    width: 220,
    height: 120,
    backgroundColor: '#f1f5f9',
    borderColor: '#64748b',
    titleColor: '#334155',
    inputHandles: [
      {
        id: `${id}-input`,
        position: Position.Left,
        color: '#64748b'
      }
    ],
    outputHandles: [
      {
        id: `${id}-output`,
        position: Position.Right,
        color: '#10b981'
      }
    ],
    fields: [
      {
        key: 'delayMs',
        label: 'Delay (ms)',
        type: 'number',
        defaultValue: '1000',
        min: '0',
        max: '60000',
        step: '100'
      },
      {
        key: 'description',
        label: 'Description',
        type: 'text',
        defaultValue: 'Wait before proceeding',
        placeholder: 'Delay description'
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};

