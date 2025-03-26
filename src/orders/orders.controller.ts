import { Controller, Get, Post, Body, Patch, Param, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, OrderStatusDto } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy) { }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError(err => { throw new RpcException(err) })
    )

  }

  @Get()
  findAllOrders(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto)
  }

  @Get(':id')
  findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Patch(':id/changeStatus')
  changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() orderStatusDto: OrderStatusDto) {
    return this.ordersClient.send('changeOrderStatus', { id, status: orderStatusDto.status }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )
  }

}
