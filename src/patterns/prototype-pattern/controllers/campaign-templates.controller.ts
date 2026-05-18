import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CampaignTemplateService } from '../services/campaign-template.service';
import { CloneCampaignTemplateDto } from '../dto/clone-campaign-template.dto';

@Controller('patterns/prototype/campaign-templates')
export class CampaignTemplatesController {
  constructor(
    private readonly campaignTemplateService: CampaignTemplateService,
  ) {}

  @Get()
  findAll() {
    return this.campaignTemplateService.findAll();
  }

  @Get('prototypes')
  findPrototypes() {
    return this.campaignTemplateService.findPrototypes();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.campaignTemplateService.findById(id);
  }

  @Post(':id/clone')
  clone(@Param('id') id: string, @Body() dto: CloneCampaignTemplateDto) {
    return this.campaignTemplateService.clone(id, dto);
  }

  @Post(':id/version')
  createVersion(
    @Param('id') id: string,
    @Body() dto: CloneCampaignTemplateDto,
  ) {
    return this.campaignTemplateService.createVersion(id, dto);
  }
}
