import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CloneCampaignTemplateDto } from '../dto/clone-campaign-template.dto';
import { CampaignTemplate } from '../models/campaign-template.model';

@Injectable()
export class CampaignTemplateService {
  private readonly templates: CampaignTemplate[] = [
    new CampaignTemplate(
      randomUUID(),
      'Welcome Campaign',
      'new_users',
      {
        subject: 'Welcome to our platform',
        body: 'Welcome to our platform!',
        callToAction: 'Complete your profile',
      },
      ['email', 'push'],
      {
        startsAt: new Date(),
        timezone: 'America/Argentina/Buenos_Aires',
        frequency: 'once',
      },
      {
        sendImmediately: true,
        priority: 'normal',
        retryPolicy: {
          maxRetries: 3,
          retryDelayInSeconds: 60,
        },
        tracking: {
          utmCampaign: 'welcome',
          enableOpenTracking: true,
          enableClickTracking: true,
        },
      },
      1,
      undefined,
      true,
      new Date(),
      new Date(),
    ),
    new CampaignTemplate(
      randomUUID(),
      'Payment Reminder',
      'users_with_pending_payments',
      {
        subject: 'Payment reminder',
        body: 'You have a pending payment.',
        callToAction: 'Pay now',
      },
      ['email', 'sms'],
      {
        startsAt: new Date(),
        timezone: 'America/Argentina/Buenos_Aires',
        frequency: 'weekly',
      },
      {
        sendImmediately: false,
        priority: 'high',
        retryPolicy: {
          maxRetries: 5,
          retryDelayInSeconds: 120,
        },
        tracking: {
          utmCampaign: 'payment_reminder',
          enableOpenTracking: true,
          enableClickTracking: true,
        },
      },
      1,
      undefined,
      true,
      new Date(),
      new Date(),
    ),
  ];

  findAll(): CampaignTemplate[] {
    return this.templates;
  }

  findPrototypes(): CampaignTemplate[] {
    return this.templates.filter((template) => template.isPrototype);
  }

  findById(id: string): CampaignTemplate {
    const template = this.templates.find((template) => template.id === id);

    if (!template) {
      throw new NotFoundException(`Template with id ${id} not found`);
    }

    return template;
  }

  clone(id: string, dto: CloneCampaignTemplateDto): CampaignTemplate {
    const template = this.findById(id);

    const clonedTemplate = template.clone(dto);

    this.templates.push(clonedTemplate);

    return clonedTemplate;
  }

  createVersion(id: string, dto: CloneCampaignTemplateDto): CampaignTemplate {
    const template = this.findById(id);
    const version = template.createNewVersion(dto);

    this.templates.push(version);

    return version;
  }
}
