import { ImageWithFallback } from "./ImageWithFallback.jsx";
import styles from "./MenuItemCard.module.css";

export function MenuItemCard({ item, onAddToCart }) {
  const handleCardClick = () => {
    onAddToCart(item);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    onAddToCart(item);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className={styles.name}>{item.name}</h3>
            <p className={styles.description}>{item.description}</p>
          </div>
          <div className={styles.footer}>
            <span className={styles.price}>
              {item.price.toLocaleString()}원
            </span>
            <button onClick={handleButtonClick} className={styles.addButton}>
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
