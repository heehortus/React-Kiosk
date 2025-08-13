import { useState } from "react";
import { MenuCategories, PaymentMethods, OrderStatus } from "./types/menu";
import { MenuItemCard } from "./components/MenuItemCard";
import { Cart } from "./components/Cart";
import { PaymentModal } from "./components/PaymentModal";
import { OrderHistory } from "./components/OrderHistory";
import "./App.css";

const menuItems = [
  // 커피 카테고리 (1-3)
  {
    id: "1",
    name: "아메리카노",
    price: 3500,
    description: "진한 에스프레소와 깔끔한 뒷맛이 어우러진 커피",
    category: MenuCategories.COFFEE,
    image:
      "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "카페라떼",
    price: 4500,
    description: "부드러운 우유와 에스프레소의 조화",
    category: MenuCategories.COFFEE,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "카푸치노",
    price: 4800,
    description: "풍부한 우유 거품과 향긋한 원두의 맛",
    category: MenuCategories.COFFEE,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
  },

  // 차 카테고리 (4-7)
  {
    id: "4",
    name: "그린티",
    price: 4000,
    description: "신선한 녹차잎으로 우린 건강한 차",
    category: MenuCategories.TEA,
    image:
      "https://images.unsplash.com/photo-1576092762793-c0e9395ec4b9?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "얼그레이",
    price: 4200,
    description: "베르가못 향이 은은한 영국식 홍차",
    category: MenuCategories.TEA,
    image:
      "https://images.unsplash.com/photo-1605618826115-fb9e775cfb40?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "캐모마일",
    price: 3800,
    description: "마음을 진정시키는 은은하고 부드러운 허브차",
    category: MenuCategories.TEA,
    image:
      "https://images.unsplash.com/photo-1652620386215-d7aaf6edf856?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    name: "페퍼민트",
    price: 3800,
    description: "상쾌하고 시원한 민트 향이 가득한 허브차",
    category: MenuCategories.TEA,
    image:
      "https://images.unsplash.com/photo-1491720731493-223f97d92c21?w=400&h=300&fit=crop",
  },

  // 디저트 카테고리 (8-11)
  {
    id: "8",
    name: "치즈케이크",
    price: 5500,
    description: "부드럽고 진한 치즈의 맛",
    category: MenuCategories.DESSERT,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
  },
  {
    id: "9",
    name: "초콜릿케이크",
    price: 6000,
    description: "진한 초콜릿의 달콤함",
    category: MenuCategories.DESSERT,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
  },
  {
    id: "10",
    name: "마카롱",
    price: 3000,
    description: "색색깔의 달콤한 프랑스 전통 디저트",
    category: MenuCategories.DESSERT,
    image:
      "https://images.unsplash.com/photo-1422255198496-21531f12a6e8?w=400&h=300&fit=crop",
  },
  {
    id: "11",
    name: "티라미수",
    price: 6500,
    description: "마스카포네 치즈와 에스프레소의 완벽한 조화",
    category: MenuCategories.DESSERT,
    image:
      "https://images.unsplash.com/photo-1712262582533-dcf8deba14a3?w=400&h=300&fit=crop",
  },
];

const categories = [
  { key: MenuCategories.COFFEE, label: "☕ 커피" },
  { key: MenuCategories.TEA, label: "🍃 차" },
  { key: MenuCategories.DESSERT, label: "🧁 디저트" },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(
    MenuCategories.COFFEE
  );
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("menu");
  const [orderCounter, setOrderCounter] = useState(1);

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleOrder = () => {
    if (cartItems.length > 0) {
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentComplete = (paymentMethod) => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: `order-${Date.now()}`,
      items: [...cartItems],
      totalPrice,
      paymentMethod,
      status: OrderStatus.PREPARING,
      orderNumber: orderCounter,
      timestamp: new Date(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setOrderCounter((prev) => prev + 1);

    // 주문 상태 업데이트 시뮬레이션
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === newOrder.id
            ? { ...order, status: OrderStatus.READY }
            : order
        )
      );
    }, 30000);

    setTimeout(() => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === newOrder.id
            ? { ...order, status: OrderStatus.COMPLETED }
            : order
        )
      );
    }, 60000);
  };

  const handleViewOrders = () => {
    setCurrentView("orders");
  };

  const handleBackToMenu = () => {
    setCurrentView("menu");
  };

  if (currentView === "orders") {
    return <OrderHistory orders={orders} onBackToMenu={handleBackToMenu} />;
  }

  return (
    <div className="container">
      <div className="maxWidth">
        {/* 헤더 */}
        <div className="header">
          <h1 className="title">CAFE KIOSK</h1>
          <p className="subtitle">메뉴를 선택하세요</p>
        </div>

        {/* 카테고리 탭 */}
        <div className="categoryTabs">
          <div className="categoryContainer">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`$"categoryButton" ${
                  selectedCategory === category.key
                    ? "categoryButtonActive"
                    : "categoryButtonInactive"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* 메뉴 그리드 */}
        <div className="menuGrid">
          <div className="gridContainer">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        </div>

        {/* 장바구니 */}
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onOrder={handleOrder}
          onViewOrders={handleViewOrders}
        />

        {/* 결제 모달 */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          cartItems={cartItems}
          totalPrice={cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    </div>
  );
}
