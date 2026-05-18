import { randomUUID } from 'crypto';
import { CloneCampaignTemplateDto } from '../dto/clone-campaign-template.dto';

export class CampaignTemplate {
  constructor(
    public readonly id: string,
    public name: string,
    public audienceSegment: string,
    public content: CampaignTemplateContent,
    public channels: string[],
    public schedule: CampaignTemplateSchedule,
    public settings: CampaignTemplateSettings,
    public version: number,
    public readonly sourceTemplateId: string | undefined,
    public readonly isPrototype: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  clone(overrides: CloneCampaignTemplateDto): CampaignTemplate {
    const content = {
      ...this.content,
      ...overrides.content,
      body:
        overrides.customMessage ?? overrides.content?.body ?? this.content.body,
    };
    const settings = {
      ...this.settings,
      ...overrides.settings,
      retryPolicy: {
        ...this.settings.retryPolicy,
        ...overrides.settings?.retryPolicy,
      },
      tracking: {
        ...this.settings.tracking,
        ...overrides.settings?.tracking,
      },
    };
    const now = new Date();

    return new CampaignTemplate(
      randomUUID(),
      overrides.name ?? overrides.newName ?? `${this.name} copy`,
      overrides.audienceSegment ??
        overrides.newAudience ??
        this.audienceSegment,
      content,
      overrides.channels ? [...overrides.channels] : [...this.channels],
      {
        ...this.schedule,
        ...overrides.schedule,
        startsAt: overrides.schedule?.startsAt
          ? new Date(overrides.schedule.startsAt)
          : new Date(this.schedule.startsAt),
      },
      settings,
      1,
      this.sourceTemplateId ?? this.id,
      false,
      now,
      now,
    );
  }

  createNewVersion(overrides: CloneCampaignTemplateDto): CampaignTemplate {
    const clone = this.clone(overrides);

    return new CampaignTemplate(
      clone.id,
      clone.name,
      clone.audienceSegment,
      clone.content,
      clone.channels,
      clone.schedule,
      clone.settings,
      this.version + 1,
      this.sourceTemplateId ?? this.id,
      false,
      clone.createdAt,
      clone.updatedAt,
    );
  }
}

export interface CampaignTemplateContent {
  subject: string;
  body: string;
  callToAction?: string;
}

export interface CampaignTemplateSchedule {
  startsAt: Date;
  timezone: string;
  frequency: 'once' | 'daily' | 'weekly';
}

export interface CampaignTemplateSettings {
  sendImmediately: boolean;
  priority: 'low' | 'normal' | 'high';
  retryPolicy: {
    maxRetries: number;
    retryDelayInSeconds: number;
  };
  tracking: {
    utmCampaign: string;
    enableOpenTracking: boolean;
    enableClickTracking: boolean;
  };
}
