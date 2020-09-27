import { OrderService } from '../services/order.service';

export type OrderStatus = 'Received' | 'Preparing' | 'Ready';
export type OrderStatusFilter = 'All' | OrderStatus;

export type OrderItem = {
  item_id: string;
  item_name: string;
  price: number;
};

export type OrderDetail = {
  customer_id: string;
  customer_name: string;
  delivery_address: string;
  items: Array<OrderItem>;
  order_id: string;
  total_amount: number;
  status: OrderStatus;
};

export type OrderData = Array<OrderDetail>;
