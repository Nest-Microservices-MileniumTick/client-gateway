import { IsEnum } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class OrderStatusDto {
  @IsEnum(OrderStatusList, {
    message: `Status values are ${OrderStatusList}`
  })
  status: OrderStatus

}
