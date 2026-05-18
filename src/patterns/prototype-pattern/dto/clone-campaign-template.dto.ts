export class CloneCampaignTemplateDto {
  newName?: string;
  newAudience?: string;
  customMessage?: string;
  name?: string;
  audienceSegment?: string;
  content?: {
    subject?: string;
    body?: string;
    callToAction?: string;
  };
  channels?: string[];
  schedule?: {
    startsAt?: string;
    timezone?: string;
    frequency?: 'once' | 'daily' | 'weekly';
  };
  settings?: {
    sendImmediately?: boolean;
    priority?: 'low' | 'normal' | 'high';
    retryPolicy?: {
      maxRetries?: number;
      retryDelayInSeconds?: number;
    };
    tracking?: {
      utmCampaign?: string;
      enableOpenTracking?: boolean;
      enableClickTracking?: boolean;
    };
  };
}
