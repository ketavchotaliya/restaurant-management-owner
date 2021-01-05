declare module Restaurant {
  export interface Restaurant {
    restaurant_id?: number;
    restaurant_name?: string;
    user_id?: number;
    address?: string;
    phone_number?: string;
    open_time_1?: string;
    close_time_1?: string;
    open_time_2?: string;
    close_time_2?: string;
    is_restaurant_open?: number;
    table_allocation_time?: number;
    is_active?: number;
    created_at?: Date;
    updated_at?: Date;
    updated_by?: number;
  }

  export interface Tables {
    table_id?: number;
    restaurant_id?: number;
    table_no?: string;
    table_size?: string;
    is_active?: number;
  }
}

export = Restaurant;
