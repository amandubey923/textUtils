import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function Alert(props) {
  if (!props.alert) return null;

  return (
    <div
      className="container mt-3"
      style={{
        position: 'fixed',
        top: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '9999',
        maxWidth: '500px',
      }}
    >
      <div
        className="d-flex align-items-center gap-3"
        style={{
          background: props.alert.type === 'success'
            ? 'linear-gradient(135deg,#3B82F6,#8B5CF6)'
            : '#ef4444',
          color: '#fff',
          padding: '14px 20px',
          borderRadius: '14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.20)',
          fontWeight: '600',
        }}
      >
        {props.alert.type === 'success' ? (
          <FaCheckCircle size={20} />
        ) : (
          <FaExclamationCircle size={20} />
        )}

        <span>{props.alert.msg}</span>
      </div>
    </div>
  );
}