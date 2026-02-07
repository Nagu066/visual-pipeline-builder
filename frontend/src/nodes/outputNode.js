// outputNode.js
// Refactored to use BaseNode abstraction

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    width: 220,
    height: 120,
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    titleColor: '#1e40af',
    inputHandles: [
      {
        id: `${id}-value`,
        position: Position.Left,
        color: '#3b82f6'
      }
    ],
    outputHandles: [],
    fields: [
      {
        key: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customOutput-', 'output_'),
        placeholder: 'Enter output name'
      },
      {
        key: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' },
          { value: 'File', label: 'File' },
          { value: 'JSON', label: 'JSON' }
        ]
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};
