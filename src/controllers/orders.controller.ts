import { Request, Response } from 'express';
import * as ordersService from '../services/orders.service';
import { Order } from '../types/order.type';

export const create = async (req: Request, res: Response) => {

  const { productsList } = req.body ?? {};
  const {id} = (req as any).user ?? "";

    if (productsList.length === 0)
    return res.status(400).json({ message: 'Invalid request.' });

  try {
    const order = await ordersService.create(id, productsList);
    console.log(order)
    res.status(201).json({ order });
  } catch (err) {
    res.status(400).json({ message: 'Error Bad Request' });
  }
};

export const getMyOrdersList = (req: Request, res: Response) => {
  const { id } = (req as any).user ?? "";

  if (!id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const orders = ordersService.getMyOrdersList(id);
    res.status(200).json({ orders });
  } catch (err) {
    res.status(400).json({ message: 'Error Bad Request' });
  }
};

export const getById = (req: Request, res: Response) => {

  const id = req.params.id;
  const { id: userId } = (req as any).user ?? "";

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const order: Order | undefined = ordersService.getOrderById(id);

    if(!order) {
        return res.status(404).json({message: "Order not found"})
    }

    if(order.userId !== userId) {
        return res.status(401).json({message: "Unauthorized"})
    }

    res.status(200).json({order})

  } catch (err) {
    res.status(400).json({ message: 'Error Bad Request' });
  }
};