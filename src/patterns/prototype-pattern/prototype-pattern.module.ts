import { Module } from '@nestjs/common';
import { CampaignTemplatesController } from './controllers/campaign-templates.controller';
import { CampaignTemplateService } from './services/campaign-template.service';

@Module({
  controllers: [CampaignTemplatesController],
  providers: [CampaignTemplateService],
})
export class PrototypePatternModule {}
