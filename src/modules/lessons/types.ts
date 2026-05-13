import { Lesson } from '@/src/types';

export interface LessonsState {
  items: Lesson[];
  selectedItem: Lesson | null;
  loading: boolean;
  error: string | null;
}
