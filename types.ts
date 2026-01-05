
export enum InvitationPageType {
  COVER = 'Cover Page',
  DETAILS = 'Event Details',
  LOCATION = 'Map & Venue',
  RSVP = 'RSVP Card'
}

export interface WeddingDetails {
  partner1: string;
  partner2: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  rsvpDeadline: string;
  additionalNotes: string;
}

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  promptSuffix: string;
  previewUrl: string;
}

export interface GeneratedInvitation {
  id: string;
  pages: {
    type: InvitationPageType;
    url: string;
    prompt: string;
  }[];
  timestamp: number;
}
