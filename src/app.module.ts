import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { RepositoryPatternModule } from './patterns/repository-pattern/repository-pattern.module';
import { ServiceLayerPatternModule } from './patterns/service-layer-pattern/service-layer-pattern.module';
import { StrategyPatternModule } from './patterns/strategy-pattern/strategy-pattern.module';
import { FactoryPatternModule } from './patterns/factory-pattern/factory-pattern.module';
import { AdapterPatternModule } from './patterns/adapter-pattern/adapter-pattern.module';
import { ObserverPatternModule } from './patterns/observer-pattern/observer-pattern.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),

    RepositoryPatternModule,
    ServiceLayerPatternModule,
    StrategyPatternModule,
    FactoryPatternModule,
    AdapterPatternModule,
    ObserverPatternModule,
  ],
})
export class AppModule {}
