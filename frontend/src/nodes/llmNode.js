// llmNode.js
// Refactored to use BaseNode abstraction

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    width: 240,
    height: 180,
    backgroundColor: '#ede9fe',
    borderColor: '#8b5cf6',
    titleColor: '#5b21b6',
    inputHandles: [
      {
        id: `${id}-system`,
        position: Position.Left,
        color: '#8b5cf6',
        top: '30%'
      },
      {
        id: `${id}-prompt`,
        position: Position.Left,
        color: '#8b5cf6',
        top: '70%'
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
        key: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'gpt-4',
        options: [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
          { value: 'claude-3', label: 'Claude 3' },
          { value: 'llama-2', label: 'Llama 2' }
        ]
      },
      {
        key: 'temperature',
        label: 'Temperature',
        type: 'number',
        defaultValue: '0.7',
        min: '0',
        max: '2',
        step: '0.1'
      },
      {
        key: 'maxTokens',
        label: 'Max Tokens',
        type: 'number',
        defaultValue: '1000',
        min: '1',
        max: '4000',
        step: '1'
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};
