import { NewsItem } from '@/src/types';

export interface NewsState {
  items: NewsItem[];
  selectedItem: NewsItem | null;
  loading: boolean;
  error: string | null;
}
