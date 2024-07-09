import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'roundhouse.proxy.rlwy.net',
      port: 53047,
      username: 'root',
      password: 'yRbbBoJCYZiCaFwoIOpjWmpbmeZjkHyq',
      database: 'railway',
      entities: [User],
      synchronize: true, // * Opcional: sincroniza automáticamente las estructuras de la base de datos (no recomendado en producción)
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
