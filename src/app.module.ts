import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { RepositoryPatternModule } from './patterns/repository-pattern/repository-pattern.module';
import { ServiceLayerPatternModule } from './patterns/service-layer-pattern/service-layer-pattern.module';
import { StrategyPatternModule } from './patterns/strategy-pattern/strategy-pattern.module';
import { FactoryPatternModule } from './patterns/factory-pattern/factory-pattern.module';
import { AdapterPatternModule } from './patterns/adapter-pattern/adapter-pattern.module';
import { ObserverPatternModule } from './patterns/observer-pattern/observer-pattern.module';
import { BuilderPatternModule } from './patterns/builder-pattern/builder-pattern.module';
import { PrototypePatternModule } from './patterns/prototype-pattern/prototype-pattern.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),

    RepositoryPatternModule,
    ServiceLayerPatternModule,
    StrategyPatternModule,
    FactoryPatternModule,
    AdapterPatternModule,
    ObserverPatternModule,
    BuilderPatternModule,
    PrototypePatternModule,
  ],
})
export class AppModule {}
