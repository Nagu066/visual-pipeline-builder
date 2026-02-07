// transformNode.js
// New node: Transform node for data transformation

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const config = {
    title: 'Transform',
    width: 220,
    height: 140,
    backgroundColor: '#fce7f3',
    borderColor: '#ec4899',
    titleColor: '#9f1239',
    inputHandles: [
      {
        id: `${id}-input`,
        position: Position.Left,
        color: '#ec4899'
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
        key: 'transformType',
        label: 'Transform Type',
        type: 'select',
        defaultValue: 'uppercase',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'reverse', label: 'Reverse' },
          { value: 'trim', label: 'Trim' },
          { value: 'capitalize', label: 'Capitalize' }
        ]
      },
      {
        key: 'description',
        label: 'Description',
        type: 'text',
        defaultValue: '',
        placeholder: 'Transform description'
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};

