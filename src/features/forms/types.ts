export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export type SubscriptionPayload = {
  email: string;
  source?: string;
};

export type ContactMessagePayload = {
  name: string;
  email: string;
  message: string;
};
