import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

export default function Alert({ alert }) {
  if (!alert) return null;

  const iconMap = {
    success: <FiCheckCircle size={18} />,
    danger: <FiAlertCircle size={18} />,
    info: <FiInfo size={18} />
  };

  return (
    <div className={`textora-toast ${alert.type || 'info'}`} role="alert" aria-live="polite">
      {iconMap[alert.type] || <FiInfo size={18} />}
      <span>{alert.msg}</span>
    </div>
  );
}
