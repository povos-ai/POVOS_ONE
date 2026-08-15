/**
 * Search service - connects to backend /search endpoint
 */
import api from './api';
import { SearchParams, SearchResponse } from '@/types/search.types';

export const searchService = {
  async search(params: SearchParams = {}): Promise<SearchResponse> {

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/search?${queryString}` : '/search';

    try {
      const response = await api.get<SearchResponse>(url);
      
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }
};

