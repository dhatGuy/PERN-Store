import { Request, Response } from "express";
import { ApiResponse } from "~/utils/apiResponse";
import ProductService from "./product.service";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 12 } = req.query;

    const result = await this.productService.index({
      limit: Number(limit),
      page: Number(page),
    });
    res.json(
      ApiResponse.paginated(
        "Products fetched successfully",
        result.products,
        Number(page),
        +limit,
        result.totalRecords
      )
    );
  };

  // getAllProductsAdmin = async (req: Request, res: Response) => {
  //   const { page = 1 } = req.query;

  //   const products = await this.productService.getAllProductsAdmin(page);
  //   res.json(products);
  // };

  createProduct = async (req: Request, res: Response) => {
    const newProduct = await this.productService.createProduct(req.body);
    res
      .status(201)
      .json(ApiResponse.success("Product created successfully", newProduct));
  };

  getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await this.productService.getProduct({ id: Number(id) });
    res
      .status(200)
      .json(ApiResponse.success("Product fetched successfully", product));
  };

  getProductBySlug = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const product = await this.productService.getProductBySlug({ slug });
    res
      .status(200)
      .json(ApiResponse.success("Product fetched successfully", product));
  };

  getProductByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    const product = await this.productService.getProductByName({ name });
    res
      .status(200)
      .json(ApiResponse.success("Product fetched successfully", product));
  };

  updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedProduct = await this.productService.updateProduct(
      Number(id),
      req.body
    );
    res
      .status(200)
      .json(
        ApiResponse.success("Product updated successfully", updatedProduct)
      );
  };

  deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.productService.deleteProduct({ id: Number(id) });
    res.status(204);
  };
}
