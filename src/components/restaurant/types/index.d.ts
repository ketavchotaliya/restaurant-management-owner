import { RestaurantModel } from '../models';

declare module RestaurantMaster {
  export interface Restaurant {
    is_active?: number;
  }
}

export = RestaurantMaster;
