// apiNode.js
// New node: API call node

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const config = {
    title: 'API Call',
    width: 260,
    height: 200,
    backgroundColor: '#e0e7ff',
    borderColor: '#6366f1',
    titleColor: '#312e81',
    inputHandles: [
      {
        id: `${id}-request`,
        position: Position.Left,
        color: '#6366f1',
        top: '50%'
      }
    ],
    outputHandles: [
      {
        id: `${id}-response`,
        position: Position.Right,
        color: '#10b981'
      }
    ],
    fields: [
      {
        key: 'url',
        label: 'URL',
        type: 'text',
        defaultValue: 'https://api.example.com',
        placeholder: 'API endpoint URL'
      },
      {
        key: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' },
          { value: 'PATCH', label: 'PATCH' }
        ]
      },
      {
        key: 'timeout',
        label: 'Timeout (ms)',
        type: 'number',
        defaultValue: '5000',
        min: '1000',
        max: '60000',
        step: '1000'
      },
      {
        key: 'headers',
        label: 'Headers (JSON)',
        type: 'textarea',
        defaultValue: '{}',
        placeholder: '{"Content-Type": "application/json"}',
        rows: 2
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};

