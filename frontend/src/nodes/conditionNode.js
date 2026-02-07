// conditionNode.js
// New node: Conditional logic node

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const config = {
    title: 'Condition',
    width: 240,
    height: 180,
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
    titleColor: '#92400e',
    inputHandles: [
      {
        id: `${id}-input`,
        position: Position.Left,
        color: '#f59e0b',
        top: '50%'
      }
    ],
    outputHandles: [
      {
        id: `${id}-true`,
        position: Position.Right,
        color: '#10b981',
        top: '30%'
      },
      {
        id: `${id}-false`,
        position: Position.Right,
        color: '#ef4444',
        top: '70%'
      }
    ],
    fields: [
      {
        key: 'condition',
        label: 'Condition',
        type: 'select',
        defaultValue: 'equals',
        options: [
          { value: 'equals', label: 'Equals' },
          { value: 'contains', label: 'Contains' },
          { value: 'greaterThan', label: 'Greater Than' },
          { value: 'lessThan', label: 'Less Than' },
          { value: 'notEquals', label: 'Not Equals' }
        ]
      },
      {
        key: 'value',
        label: 'Value',
        type: 'text',
        defaultValue: '',
        placeholder: 'Condition value'
      },
      {
        key: 'trueLabel',
        label: 'True Label',
        type: 'text',
        defaultValue: 'True',
        placeholder: 'Label for true branch'
      },
      {
        key: 'falseLabel',
        label: 'False Label',
        type: 'text',
        defaultValue: 'False',
        placeholder: 'Label for false branch'
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};

