import path from 'path';
import { OrderItem } from '../types/order-item.type';
import { Order } from '../types/order.type';
import fs from 'fs';
import { writeJsonFile } from '../utils/writeJsonFile';
import { JSON_FILE_ORDERS } from '../constants/JSON_FILE';
import { getProductById } from './products.service';

const file: string = path.resolve('src/data/orders.seed.json');
const data: string = fs.readFileSync(file, 'utf-8');
const orders: Order[] = JSON.parse(data) as Order[];

export const create = async (userId: string, items: OrderItem[]): Promise<Order | null> => {
  console.dir(items);

  for (const item of items) {
    const product = getProductById(item.productId);
    if (!product) {
      throw new Error(`Le produit avec l'ID ${item.productId} n'existe pas`);
    }
    if (item.quantity <= 0) {
      throw new Error('La quantité doit être positive');
    }
  }

  const newOrder = {
    id: Math.floor(Math.random() * 10000000).toString(),
    userId,
    items,
  };

  orders.push(newOrder);

  writeJsonFile(JSON_FILE_ORDERS, orders);
  console.log(newOrder)

  return newOrder;
};

export const getOrderById = (id: string) => {
  const order: Order[] = orders.filter((order) => order.id === id);

  return order.length >= 0 ? order[0] : undefined;
};

export const getMyOrdersList = (userId: string): Order[] => {
  return orders.filter((order) => order.userId === userId);
};