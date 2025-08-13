import { useState } from 'react';
import { PaymentMethods } from '../types/menu';
import { CreditCard, Banknote, Clock } from 'lucide-react';
import styles from './PaymentModal.module.css';

export function PaymentModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  totalPrice, 
  onPaymentComplete 
}) {
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethods.CARD);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // 결제 처리 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onPaymentComplete(paymentMethod);
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>결제하기</h2>
          <p className={styles.description}>
            주문 내역을 확인하고 결제 방법을 선택해주세요.
          </p>
        </div>
        
        <div className={styles.content}>
          {/* 주문 요약 */}
          <div className={styles.orderSummary}>
            <h4 className={styles.orderSummaryTitle}>주문 내역</h4>
            <div className={styles.orderItems}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              ))}
            </div>
            <div className={styles.orderTotal}>
              <div className={styles.totalRow}>
                <span>총 결제금액</span>
                <span className={styles.totalPrice}>{totalPrice.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 결제 방법 선택 */}
          <div className={styles.paymentSection}>
            <h4 className={styles.paymentTitle}>결제 방법</h4>
            <div className={styles.paymentOptions}>
              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="card"
                  name="payment"
                  value={PaymentMethods.CARD}
                  checked={paymentMethod === PaymentMethods.CARD}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={styles.radioInput}
                />
                <label htmlFor="card" className={styles.paymentLabel}>
                  <CreditCard className={`${styles.paymentIcon} ${styles.cardIcon}`} />
                  <span>신용/체크카드</span>
                </label>
              </div>
              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="cash"
                  name="payment"
                  value={PaymentMethods.CASH}
                  checked={paymentMethod === PaymentMethods.CASH}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={styles.radioInput}
                />
                <label htmlFor="cash" className={styles.paymentLabel}>
                  <Banknote className={`${styles.paymentIcon} ${styles.cashIcon}`} />
                  <span>현금</span>
                </label>
              </div>
            </div>
          </div>

          {/* 결제 버튼 */}
          <div className={styles.buttons}>
            <button 
              onClick={onClose}
              className={`${styles.button} ${styles.cancelButton}`}
              disabled={isProcessing}
            >
              취소
            </button>
            <button 
              onClick={handlePayment}
              className={`${styles.button} ${styles.payButton}`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className={styles.processingContent}>
                  <Clock className={styles.spinner} />
                  결제 중...
                </div>
              ) : (
                `${totalPrice.toLocaleString()}원 결제`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}