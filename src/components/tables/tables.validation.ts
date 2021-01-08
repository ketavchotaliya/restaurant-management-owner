import { NextFunction, Request, Response } from 'express';
import { createValidationResponse } from '../../utils/helper';
import { isEmpty, isIn, isNumber } from '../../utils/validator';

class TablesValidations {
  addTable(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const { restaurant_id, table_no, table_size } = req.body;
    const errors: any = {};

    if (isEmpty(authorization)) {
      errors.authorization = res.__('VALIDATIONS.COMMON.authorization.required');
    }

    if (isEmpty(restaurant_id)) {
      errors.restaurant_id = res.__('RESTAURANT.restaurant_id.required');
    } else if (isEmpty(restaurant_id)) {
      errors.restaurant_id = res.__('RESTAURANT.restaurant_id.number');
    }

    if (isEmpty(table_no)) {
      errors.table_no = res.__('TABLES.table_no.required');
    } else if (!isNumber(table_no)) {
      errors.table_no = res.__('TABLES.table_no.number');
    }

    if (isEmpty(table_size)) {
      errors.table_size = res.__('TABLES.table_size.required');
    } else if (!isNumber(table_size)) {
      errors.table_size = res.__('TABLES.table_size.number');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  validateTableId(req: Request, res: Response, next: NextFunction) {
    const { table_id } = req.params;
    const errors: any = {};

    if (isEmpty(table_id)) {
      errors.tableId = res.__('TABLES.tableId.required');
    } else if (!isNumber(table_id)) {
      errors.tableId = res.__('TABLES.tableId.number');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  updateTable(req: Request, res: Response, next: NextFunction) {
    const { is_active } = req.body;
    const errors: any = {};

    if (isEmpty(is_active)) {
      errors.is_active = res.__('RESTAURANT.is_active.required');
    } else if (!isIn(is_active, [0, 1])) {
      errors.is_active = res.__('RESTAURANT.is_active.valid');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new TablesValidations();
