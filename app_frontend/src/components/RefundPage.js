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

  // PUBLIC_INTERFACE
  const handleAmountChange = (e) => {
    let value = e.target.value;

    // Allow only digits and dots
    value = value.replace(/[^\d.]/g, '');

    // If multiple dots, keep only the first and remove the rest
    const firstDotIndex = value.indexOf('.');
    if (firstDotIndex !== -1) {
      // Remove any subsequent dots
      const before = value.slice(0, firstDotIndex + 1);
      const after = value
        .slice(firstDotIndex + 1)
        .replace(/\./g, '');
      value = before + after;
    }

    // At this point, the string matches: ^\d*\.?\d*$
    // We only constrain decimal places AFTER the user stops typing (onBlur)
    // but we'll still allow up to 2 for smoother UX if they paste more.
    const match = value.match(/^(\d*)(?:\.(\d*))?$/);
    if (match) {
      const integerPart = match[1] ?? '';
      const decimalPart = match[2] ?? undefined;

      // If there is a decimal part, limit its length to 2, but do NOT remove the dot itself.
      if (decimalPart !== undefined) {
        const limitedDecimal = decimalPart.slice(0, 2);
        value = `${integerPart}.${limitedDecimal}`;
      } else {
        value = integerPart;
      }

      // Allow empty string to let user clear field
      setRefundAmount(value);
    } else if (value === '') {
      setRefundAmount('');
    }
  };

  const handleBlur = () => {
    // Format to 2 decimal places when leaving the input,
    // but only if a valid number exists.
    const trimmed = (refundAmount || '').trim();

    // Accept '.', '', and similar transient values -> normalize to '0.00'
    // Or if it's like '12.' -> treat as '12.00'
    if (trimmed === '' || trimmed === '.' || trimmed === '.0' || trimmed === '.00') {
      setRefundAmount('0.00');
      return;
    }

    const numValue = parseFloat(trimmed);
    if (!isNaN(numValue)) {
      setRefundAmount(numValue.toFixed(2));
    } else {
      // If parse fails, reset to safe default
      setRefundAmount('0.00');
    }
  };

  // When enabling submit button, require a positive numeric value
  const isPositiveNumber = (() => {
    const n = parseFloat(refundAmount);
    return !isNaN(n) && n > 0;
  })();

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
              // Pattern allows empty, digits, optional dot and digits (doesn't interfere with controlled input)
              pattern="^\d*\.?\d*$"
              className="refund-input"
              placeholder="0.00"
            />
            <button
              className="refund-submit-btn"
              onClick={handleRefundSubmit}
              disabled={isSubmitting || !isPositiveNumber}
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
