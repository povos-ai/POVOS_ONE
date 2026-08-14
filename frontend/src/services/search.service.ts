/**
 * Search service - connects to backend /search endpoint
 */
import api from './api';
import { SearchParams, SearchResponse } from '@/types/search.types';

export const searchService = {
  async search(params: SearchParams = {}): Promise<SearchResponse> {
    console.log('ðŸ” Search service called with params:', params);

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/search?${queryString}` : '/search';

    console.log('ðŸ” Search request URL:', url);

    try {
      const response = await api.get<SearchResponse>(url);
      console.log('âœ… Search response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('âŒ Search error caught in service:', error);
      throw error;
    }
  }
};
