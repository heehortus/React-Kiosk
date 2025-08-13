import styles from './Cart.module.css';

export function Cart({ cartItems, onUpdateQuantity, onOrder, onViewOrders }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <span className={styles.cartInfo}>장바구니: {totalItems}개</span>
        <button
          onClick={onViewOrders}
          className={styles.orderHistoryButton}
        >
          주문내역
        </button>
      </div>
      
      {cartItems.length > 0 && (
        <div className={styles.items}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemPrice}>{item.price.toLocaleString()}원</div>
              </div>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityButton}
                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className={styles.total}>
            <div className={styles.totalPrice}>총 {totalPrice.toLocaleString()}원</div>
          </div>
        </div>
      )}
      
      <button 
        onClick={onOrder}
        disabled={cartItems.length === 0}
        className={styles.orderButton}
      >
        주문하기
      </button>
    </div>
  );
}