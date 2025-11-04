import { Request, Response } from "express"

export const Health = (_req: Request, res: Response) => {
    return res.status(200).json({message: 'API OK'})
}