import { NewspaperIssue } from '@/src/types';

export interface NewspapersState {
  items: NewspaperIssue[];
  loading: boolean;
  error: string | null;
}
