import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ENV, PRODUCT_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: ENV.PRODUCTS_MICROSERVICE_HOST,
          port: ENV.PRODUCTS_MICROSERVICE_PORT
        }
      }
    ])
  ]
})

export class ProductsModule { }
