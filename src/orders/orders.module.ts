import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ENV, ORDER_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: ENV.ORDERS_MICROSERVICE_HOST,
          port: ENV.ORDERS_MICROSERVICE_PORT
        }
      }
    ])
  ]
})
export class OrdersModule {}
