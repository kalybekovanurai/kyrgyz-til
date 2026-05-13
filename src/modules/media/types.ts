import { MediaItem } from '@/src/types';

export interface MediaState {
  items: MediaItem[];
  selectedItem: MediaItem | null;
  loading: boolean;
  error: string | null;
}
