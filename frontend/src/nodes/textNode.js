// textNode.js
// Enhanced Text node with dynamic sizing and variable parsing

import { useState, useEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';

// JavaScript variable name regex pattern
const JS_VARIABLE_REGEX = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

// Parse variables from text (e.g., "{{ input }}" or "{{variable}}")
const parseVariables = (text) => {
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = new Set();
  let match;
  
  while ((match = variableRegex.exec(text)) !== null) {
    const varName = match[1].trim();
    if (JS_VARIABLE_REGEX.test(varName)) {
      variables.add(varName);
    }
  }
  
  return Array.from(variables);
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const textareaRef = useRef(null);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeHeight, setNodeHeight] = useState(120);
  const [nodeWidth, setNodeWidth] = useState(240);

  // Parse variables when text changes
  useEffect(() => {
    const parsedVars = parseVariables(currText);
    setVariables(parsedVars);
    updateNodeField(id, 'text', currText);
    updateNodeField(id, 'variables', parsedVars);
    // Update node internals to recalculate handle positions
    updateNodeInternals(id);
  }, [currText, id, updateNodeField, updateNodeInternals]);

  // Auto-resize textarea and node
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const minHeight = 60;
      const maxHeight = 300;
      const newHeight = Math.max(minHeight, Math.min(scrollHeight + 20, maxHeight));
      
      // Update node height
      setNodeHeight(newHeight + 80); // Add padding for title and handles
      
      // Update textarea height
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [currText]);

  // Calculate node width based on content
  useEffect(() => {
    if (textareaRef.current) {
      const minWidth = 240;
      const maxWidth = 400;
      const textLength = currText.length;
      // Adjust width based on text length (rough estimation)
      const estimatedWidth = Math.min(maxWidth, Math.max(minWidth, textLength * 8 + 40));
      setNodeWidth(estimatedWidth);
    }
  }, [currText]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
  };

  return (
    <div style={{
      minWidth: nodeWidth,
      minHeight: nodeHeight,
      backgroundColor: '#f0fdf4',
      border: '2px solid #10b981',
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Title */}
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#065f46',
        borderBottom: '1px solid #d1fae5',
        paddingBottom: '6px'
      }}>
        Text
      </div>

      {/* Dynamic Input Handles based on variables */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${20 + (index + 1) * (80 / (variables.length + 1))}%`,
            background: '#10b981',
            width: '12px',
            height: '12px'
          }}
        />
      ))}

      {/* Text Input */}
      <div style={{ flex: 1, marginTop: '8px' }}>
        <label style={{
          display: 'block',
          marginBottom: '4px',
          fontSize: '12px',
          fontWeight: '500',
          color: '#065f46'
        }}>
          Text:
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{ variables }}"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #d1fae5',
            borderRadius: '4px',
            fontSize: '13px',
            resize: 'none',
            overflow: 'hidden',
            fontFamily: 'monospace',
            backgroundColor: '#ffffff',
            minHeight: '60px',
            lineHeight: '1.5'
          }}
        />
        {variables.length > 0 && (
          <div style={{
            marginTop: '6px',
            fontSize: '11px',
            color: '#059669',
            fontStyle: 'italic'
          }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: '#10b981',
          width: '12px',
          height: '12px',
          bottom: '20%'
        }}
      />
    </div>
  );
};
