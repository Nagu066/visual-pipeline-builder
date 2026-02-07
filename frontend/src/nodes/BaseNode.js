// BaseNode.js
// Base abstraction for all nodes to reduce code duplication

import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { useState, useEffect } from 'react';

/**
 * BaseNode - A reusable node component that handles common node functionality
 * 
 * @param {Object} props - Node props
 * @param {string} props.id - Node ID
 * @param {Object} props.data - Node data
 * @param {Object} props.config - Node configuration
 * @param {string} props.config.title - Node title
 * @param {Array} props.config.inputHandles - Array of input handle configs [{id, label, position}]
 * @param {Array} props.config.outputHandles - Array of output handle configs [{id, label, position}]
 * @param {Array} props.config.fields - Array of field configs for the node
 * @param {Function} props.config.renderContent - Optional custom content renderer
 */
export const BaseNode = ({ id, data, config }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [fieldValues, setFieldValues] = useState({});

  // Initialize field values from data or defaults
  useEffect(() => {
    const initialValues = {};
    config.fields?.forEach(field => {
      const defaultValue = field.defaultValue || '';
      const dataKey = field.key;
      initialValues[dataKey] = data?.[dataKey] ?? defaultValue;
      
      // Initialize in store if not present
      if (!data?.[dataKey]) {
        updateNodeField(id, dataKey, defaultValue);
      }
    });
    setFieldValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFieldChange = (fieldKey, value) => {
    setFieldValues(prev => ({ ...prev, [fieldKey]: value }));
    updateNodeField(id, fieldKey, value);
  };

  const renderField = (field) => {
    const value = fieldValues[field.key] ?? field.defaultValue ?? '';

    switch (field.type) {
      case 'text':
        return (
          <div key={field.key} style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
              {field.label}:
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              style={{
                width: '100%',
                padding: '4px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={field.key} style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
              {field.label}:
            </label>
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={field.rows || 3}
              style={{
                width: '100%',
                padding: '4px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px',
                resize: 'vertical'
              }}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.key} style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
              {field.label}:
            </label>
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              style={{
                width: '100%',
                padding: '4px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'number':
        return (
          <div key={field.key} style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
              {field.label}:
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              step={field.step}
              style={{
                width: '100%',
                padding: '4px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      minWidth: config.width || 200,
      minHeight: config.height || 100,
      backgroundColor: config.backgroundColor || '#ffffff',
      border: `2px solid ${config.borderColor || '#3b82f6'}`,
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      ...config.customStyle
    }}>
      {/* Title */}
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px',
        color: config.titleColor || '#1f2937',
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '6px'
      }}>
        {config.title}
      </div>

      {/* Input Handles */}
      {config.inputHandles?.map((handle, index) => (
        <Handle
          key={handle.id || `input-${index}`}
          type="target"
          position={handle.position || Position.Left}
          id={handle.id}
          style={{
            top: handle.top || `${((index + 1) * 100) / (config.inputHandles.length + 1)}%`,
            background: handle.color || '#3b82f6',
            width: '12px',
            height: '12px'
          }}
        />
      ))}

      {/* Custom Content or Fields */}
      <div style={{ marginTop: '8px' }}>
        {config.renderContent ? (
          config.renderContent(fieldValues, handleFieldChange, data)
        ) : (
          config.fields?.map(field => renderField(field))
        )}
      </div>

      {/* Output Handles */}
      {config.outputHandles?.map((handle, index) => (
        <Handle
          key={handle.id || `output-${index}`}
          type="source"
          position={handle.position || Position.Right}
          id={handle.id}
          style={{
            top: handle.top || `${((index + 1) * 100) / (config.outputHandles.length + 1)}%`,
            background: handle.color || '#10b981',
            width: '12px',
            height: '12px'
          }}
        />
      ))}
    </div>
  );
};

