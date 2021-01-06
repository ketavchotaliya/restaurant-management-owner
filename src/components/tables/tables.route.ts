import { Request, Response, Router } from 'express';
import TablesValidations from './tables.validation';
import TablesController from './tables.controller';
import tablesMiddleware from './tables.middleware';
import restaurantMiddleware from '../restaurant/restaurant.middleware';

const router = Router();

// Add Tables
router.post(
  '/',
  TablesValidations.addTable,
  restaurantMiddleware.authorizedRestaurant,
  tablesMiddleware.checkTableNumber_Available,
  (req: Request, res: Response) => {
    TablesController.addTable(req, res);
  }
);

// Update Table
router.put(
  '/:table_id',
  TablesValidations.validateTableId,
  TablesValidations.addTable,
  TablesValidations.updateTable,
  restaurantMiddleware.authorizedRestaurant,
  tablesMiddleware.authorizedTable,
  tablesMiddleware.checkTableNumber_Available,
  (req: Request, res: Response) => {
    TablesController.updateTable(req, res);
  }
);

// Delete Table
router.delete(
  '/:table_id',
  TablesValidations.validateTableId,
  tablesMiddleware.authorizedTable,
  (req: Request, res: Response) => {
    TablesController.deleteTable(req, res);
  }
);

export default router;
