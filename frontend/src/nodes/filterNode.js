// filterNode.js
// New node: Filter data based on criteria

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const config = {
    title: 'Filter',
    width: 240,
    height: 160,
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
    titleColor: '#991b1b',
    inputHandles: [
      {
        id: `${id}-input`,
        position: Position.Left,
        color: '#ef4444'
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
        key: 'filterType',
        label: 'Filter Type',
        type: 'select',
        defaultValue: 'contains',
        options: [
          { value: 'contains', label: 'Contains' },
          { value: 'startsWith', label: 'Starts With' },
          { value: 'endsWith', label: 'Ends With' },
          { value: 'regex', label: 'Regex' },
          { value: 'length', label: 'Length' }
        ]
      },
      {
        key: 'filterValue',
        label: 'Filter Value',
        type: 'text',
        defaultValue: '',
        placeholder: 'Value to filter by'
      },
      {
        key: 'caseSensitive',
        label: 'Case Sensitive',
        type: 'select',
        defaultValue: 'false',
        options: [
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' }
        ]
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};

