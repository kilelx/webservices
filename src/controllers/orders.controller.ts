import { Request, Response } from 'express';
import * as ordersService from '../services/orders.service';
import { Order } from '../types/order.type';

export const create = (req: Request, res: Response) => {
  try {
    const order = ordersService.create(req.body);
    res.status(201).json({ order });
  } catch (err) {
    res.status(400).json({ message: 'Error Bad Request' });
  }
};

export const getMyOrdersList = (_req: Request, res: Response) => {
  try {
    // const order = ordersService.getMyordersList(req.body);
    const orders: Order[] = []
    res.status(201).json({ orders });
  } catch (err) {
    res.status(400).json({ message: 'Error Bad Request' });
  }
};

export const getById = (_req: Request, res: Response) => {
  try {
    const order: Order | undefined = undefined;

    if(order) {
        res.status(200).json({order})
    } else {
        res.status(404).json({message: "Command not found"})
    }

  } catch (err) {
    res.status(400).json({ message: 'Error Bad Request' });
  }
};
