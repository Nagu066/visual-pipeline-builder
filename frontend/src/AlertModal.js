// AlertModal.js
// Modal component for displaying pipeline analysis results

export const AlertModal = ({ isOpen, onClose, result, error }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        animation: 'slideIn 0.2s ease-out'
      }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            {error ? 'Error' : 'Pipeline Analysis Result'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        {/* Content */}
        {error ? (
          <div style={{
            padding: '16px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#991b1b'
          }}>
            <p style={{ margin: 0, fontWeight: '500' }}>{error}</p>
          </div>
        ) : result ? (
          <div>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                padding: '16px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#1e40af',
                  fontWeight: '500',
                  marginBottom: '4px'
                }}>
                  Nodes
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1e3a8a'
                }}>
                  {result.num_nodes}
                </div>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '8px',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#166534',
                  fontWeight: '500',
                  marginBottom: '4px'
                }}>
                  Edges
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#14532d'
                }}>
                  {result.num_edges}
                </div>
              </div>
            </div>

            {/* DAG Status */}
            <div style={{
              padding: '16px',
              backgroundColor: result.is_dag ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${result.is_dag ? '#bbf7d0' : '#fecaca'}`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: result.is_dag ? '#10b981' : '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: '24px',
                  color: '#ffffff'
                }}>
                  {result.is_dag ? '✓' : '✗'}
                </span>
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: result.is_dag ? '#166534' : '#991b1b',
                  marginBottom: '4px'
                }}>
                  {result.is_dag ? 'Valid DAG' : 'Not a DAG'}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: result.is_dag ? '#15803d' : '#dc2626'
                }}>
                  {result.is_dag 
                    ? 'The pipeline forms a valid directed acyclic graph.'
                    : 'The pipeline contains cycles and is not a valid DAG.'}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Close Button */}
        <div style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

