import { IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator"
import { OrderStatus, OrderStatusList } from "../enum/order.enum"
import { Type } from "class-transformer"

export class CreateOrderDto {

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  totalAmount: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  totalItems:number

  @IsEnum(OrderStatusList, {
    message: `Status values are ${OrderStatusList}`
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING
}
