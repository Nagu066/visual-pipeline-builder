// inputNode.js
// Refactored to use BaseNode abstraction

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    width: 220,
    height: 120,
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
    titleColor: '#92400e',
    inputHandles: [],
    outputHandles: [
      {
        id: `${id}-value`,
        position: Position.Right,
        color: '#10b981'
      }
    ],
    fields: [
      {
        key: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customInput-', 'input_'),
        placeholder: 'Enter input name'
      },
      {
        key: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
          { value: 'Number', label: 'Number' },
          { value: 'Boolean', label: 'Boolean' }
        ]
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};
