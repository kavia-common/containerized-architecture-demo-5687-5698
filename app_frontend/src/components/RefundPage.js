import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RefundPage.css';

// PUBLIC_INTERFACE
const RefundPage = () => {
  const [showRefund, setShowRefund] = useState(false);
  const [refundAmount, setRefundAmount] = useState('0.00');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRefundSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Refund processed successfully!');
      setShowRefund(false);
      setRefundAmount('0.00');
    } catch (error) {
      toast.error('Failed to process refund. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;
    
    // Remove any non-numeric or non-decimal characters except the first decimal point
    value = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit decimal places to 2
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }

    // Update state if empty or valid decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setRefundAmount(value);
    }
  };

  const handleBlur = () => {
    // Format to 2 decimal places when leaving the input
    if (refundAmount) {
      const numValue = parseFloat(refundAmount);
      if (!isNaN(numValue)) {
        setRefundAmount(numValue.toFixed(2));
      }
    }
  };

  return (
    <div className="refund-page">
      <h1 className="refund-title">Send Refund</h1>
      
      {!showRefund ? (
        <button 
          className="show-refund-btn"
          onClick={() => setShowRefund(true)}
        >
          Show Refund Details
        </button>
      ) : (
        <div className="refund-form">
          <div className="input-group">
            <input
              type="text"
              value={refundAmount}
              onChange={handleAmountChange}
              onBlur={handleBlur}
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              className="refund-input"
              placeholder="0.00"
            />
            <button
              className="refund-submit-btn"
              onClick={handleRefundSubmit}
              disabled={isSubmitting || !refundAmount || parseFloat(refundAmount) === 0}
            >
              {isSubmitting ? 'Processing...' : 'OK'}
            </button>
          </div>
        </div>
      )}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default RefundPage;
