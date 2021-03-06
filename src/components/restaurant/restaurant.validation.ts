import { NextFunction, Request, Response } from 'express';
import { createValidationResponse } from '../../utils/helper';
import { isEmpty, isIn, isNumber } from '../../utils/validator';
const TIME_VALIDATION_REGEX = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;

class RestaurantValidations {
  addRestaurant(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const {
      restaurant_name,
      phone_number,
      open_time_1,
      open_time_2,
      close_time_1,
      close_time_2,
      min_reservation_period,
    } = req.body;
    const errors: any = {};

    if (isEmpty(authorization)) {
      errors.authorization = res.__('VALIDATIONS.COMMON.authorization.required');
    }

    if (isEmpty(restaurant_name)) {
      errors.restaurant_name = res.__('RESTAURANT.restaurant_name.required');
    }

    if (!isEmpty(phone_number) && !isNumber(phone_number)) {
      errors.phone_number = res.__('RESTAURANT.phone_number.number');
    }

    if (isEmpty(open_time_1)) {
      errors.open_time_1 = res.__('RESTAURANT.open_time_1.required');
    } else if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(open_time_1)) {
      errors.open_time_1 = res.__('RESTAURANT.open_time_1.invalid_time');
    }

    if (open_time_1) {
      if (isEmpty(close_time_1)) {
        errors.close_time_1 = res.__('RESTAURANT.close_time_1.required');
      } else if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(close_time_1)) {
        errors.close_time_1 = res.__('RESTAURANT.close_time_1.invalid_time');
      } else if (
        close_time_1.replace(TIME_VALIDATION_REGEX, '$1$2$3') <= open_time_1.replace(TIME_VALIDATION_REGEX, '$1$2$3')
      ) {
        errors.close_time_1 = res.__('RESTAURANT.close_time_1.less_then_start_time');
      }
    }

    if (isEmpty(min_reservation_period)) {
      errors.min_reservation_period = res.__('RESTAURANT.min_reservation_time.required');
    } else if (!isNumber(min_reservation_period)) {
      errors.min_reservation_period = res.__('RESTAURANT.min_reservation_time.number');
    }

    if (close_time_1) {
      if (!isEmpty(open_time_2)) {
        if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(open_time_2)) {
          errors.open_time_2 = res.__('RESTAURANT.open_time_1.invalid_time');
        } else if (
          open_time_2.replace(TIME_VALIDATION_REGEX, '$1$2$3') <= close_time_1.replace(TIME_VALIDATION_REGEX, '$1$2$3')
        ) {
          errors.close_time_1 = res.__('RESTAURANT.open_time_2.less_then_start_time');
        }

        if (isEmpty(close_time_2)) {
          errors.close_time_2 = res.__('RESTAURANT.close_time_2.required');
        }
      }
    }

    if (open_time_2) {
      if (!isEmpty(close_time_2)) {
        if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(close_time_2)) {
          errors.close_time_2 = res.__('RESTAURANT.close_time_1.invalid_time');
        } else if (
          close_time_2.replace(TIME_VALIDATION_REGEX, '$1$2$3') <= open_time_2.replace(TIME_VALIDATION_REGEX, '$1$2$3')
        ) {
          errors.close_time_2 = res.__('RESTAURANT.close_time_2.less_then_start_time');
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  validateRestaurantId(req: Request, res: Response, next: NextFunction) {
    let restaurantId = req.params.restaurant_id || req.body.restaurant_id || req.query.restaurant_id;
    const errors: any = {};

    if (isEmpty(restaurantId)) {
      errors.restaurant_name = res.__('RESTAURANT.restaurant_id.required');
    } else if (!isNumber(restaurantId)) {
      errors.restaurant_name = res.__('RESTAURANT.restaurant_id.number');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  updateRestaurant(req: Request, res: Response, next: NextFunction) {
    const { is_restaurant_open, is_active } = req.body;
    const errors: any = {};

    if (isEmpty(is_restaurant_open)) {
      errors.is_restaurant_open = res.__('RESTAURANT.is_restaurant_open.required');
    } else if (!isIn(is_restaurant_open, [0, 1])) {
      errors.is_restaurant_open = res.__('RESTAURANT.is_restaurant_open.valid');
    }

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

export default new RestaurantValidations();
