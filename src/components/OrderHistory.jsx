import { OrderStatus, PaymentMethods } from '../types/menu';
import { Clock, CheckCircle, Package } from 'lucide-react';
import styles from './OrderHistory.module.css';

export function OrderHistory({ orders, onBackToMenu }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case OrderStatus.PREPARING:
        return <Clock className={styles.statusIcon} />;
      case OrderStatus.READY:
        return <Package className={styles.statusIcon} />;
      case OrderStatus.COMPLETED:
        return <CheckCircle className={styles.statusIcon} />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case OrderStatus.PREPARING:
        return '준비중';
      case OrderStatus.READY:
        return '준비완료';
      case OrderStatus.COMPLETED:
        return '완료';
      default:
        return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case OrderStatus.PREPARING:
        return styles.statusPreparing;
      case OrderStatus.READY:
        return styles.statusReady;
      case OrderStatus.COMPLETED:
        return styles.statusCompleted;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        <div className={styles.header}>
          <h1 className={styles.title}>주문 내역</h1>
          <p className={styles.subtitle}>주문 현황을 확인하세요</p>
        </div>

        <div className={styles.content}>
          {orders.length === 0 ? (
            <div className={styles.emptyState}>
              <Package className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>주문 내역이 없습니다</h3>
              <p className={styles.emptyDescription}>첫 주문을 시작해보세요!</p>
            </div>
          ) : (
            <div className={styles.orders}>
              {orders.map((order) => (
                <div key={order.id} className={styles.order}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderInfo}>
                      <div className={styles.orderNumber}>
                        {order.orderNumber}
                      </div>
                      <div className={styles.orderDetails}>
                        <h4 className={styles.orderTitle}>주문번호 #{order.orderNumber}</h4>
                        <p className={styles.orderDate}>
                          {order.timestamp.toLocaleString('ko-KR')}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </div>
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map((item) => (
                      <div key={item.id} className={styles.orderItem}>
                        <span>{item.name} x {item.quantity}</span>
                        <span>{(item.price * item.quantity).toLocaleString()}원</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <div className={styles.paymentMethod}>
                      결제방법: {order.paymentMethod === PaymentMethods.CARD ? '카드' : '현금'}
                    </div>
                    <div className={styles.orderTotal}>
                      총 {order.totalPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={onBackToMenu}
          className={styles.backButton}
        >
          메뉴로 돌아가기
        </button>
      </div>
    </div>
  );
}