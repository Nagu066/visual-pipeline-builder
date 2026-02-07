// mergeNode.js
// New node: Merge multiple inputs into one output

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const config = {
    title: 'Merge',
    width: 220,
    height: 140,
    backgroundColor: '#f3e8ff',
    borderColor: '#a855f7',
    titleColor: '#6b21a8',
    inputHandles: [
      {
        id: `${id}-input1`,
        position: Position.Left,
        color: '#a855f7',
        top: '30%'
      },
      {
        id: `${id}-input2`,
        position: Position.Left,
        color: '#a855f7',
        top: '70%'
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
        key: 'mergeStrategy',
        label: 'Merge Strategy',
        type: 'select',
        defaultValue: 'concat',
        options: [
          { value: 'concat', label: 'Concatenate' },
          { value: 'join', label: 'Join' },
          { value: 'merge', label: 'Merge Objects' },
          { value: 'sum', label: 'Sum' },
          { value: 'average', label: 'Average' }
        ]
      },
      {
        key: 'separator',
        label: 'Separator',
        type: 'text',
        defaultValue: ', ',
        placeholder: 'Separator for merge'
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};

