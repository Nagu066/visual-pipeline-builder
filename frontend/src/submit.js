// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';
import { AlertModal } from './AlertModal';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setResult(null);
        setError(null);
        setShowModal(false);

        try {
            // Prepare pipeline data
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle
                }))
            };

            // Send to backend
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify(pipelineData));

            // Note: FastAPI Form typically expects POST, but the endpoint is GET
            // Using POST as that's the standard for form data
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            setResult(responseData);
            setShowModal(true);
            console.log('Pipeline parse result:', responseData);
        } catch (err) {
            setError(`Error submitting pipeline: ${err.message}`);
            setShowModal(true);
            console.error('Submit error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderTop: '2px solid #e5e7eb'
            }}>
                <button 
                    type="button" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.6 : 1,
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = '#3b82f6';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }
                    }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
                </button>
            </div>
            <AlertModal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                result={result}
                error={error}
            />
        </>
    );
}
