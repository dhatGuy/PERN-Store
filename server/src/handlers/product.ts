import { Request, Response, Router } from "express";
import ProductStore from "~/models/product";

const router = Router();
const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const result = await store.index({});
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

router.get("/", index);

export default router;
