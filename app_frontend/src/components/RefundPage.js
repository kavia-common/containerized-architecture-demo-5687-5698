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
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setRefundAmount(value);
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
              type="number"
              value={refundAmount}
              onChange={handleAmountChange}
              step="0.01"
              min="0"
              className="refund-input"
              placeholder="0.00"
            />
            <button
              className="refund-submit-btn"
              onClick={handleRefundSubmit}
              disabled={isSubmitting}
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
