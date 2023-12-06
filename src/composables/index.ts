import { updateDocumentTitle } from '@/utils';
import { onMounted } from 'vue';

export const useTitle = (title: string) => {
  onMounted(() => {
    updateDocumentTitle(title);
  });
};
