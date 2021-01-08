import Restaurant from './restaurant';
import { Tables } from '../../tables/schemas';

Restaurant.hasMany(Tables, {
  as: 'tables',
  foreignKey: 'restaurant_id',
});


export { Restaurant };
