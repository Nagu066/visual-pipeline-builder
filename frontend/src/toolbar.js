// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '20px', 
            backgroundColor: '#f9fafb',
            borderBottom: '2px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{ 
                margin: '0 0 15px 0', 
                fontSize: '18px', 
                fontWeight: '600',
                color: '#1f2937'
            }}>
                Node Palette
            </h2>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px' 
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='delay' label='Delay' />
            </div>
        </div>
    );
};
