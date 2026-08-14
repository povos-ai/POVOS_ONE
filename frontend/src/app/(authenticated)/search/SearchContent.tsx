"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { searchService } from '@/services/search.service';
import { SearchParams, SearchResult } from '@/types/search.types';
import Link from 'next/link';

export default function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    status: '',
    state: '',
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    const q = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const category = searchParams.get('category') || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';
    const state = searchParams.get('state') || '';

    setQuery(q);
    setPagination({ ...pagination, page: page || 1 });
    setFilters({ category, type, status, state });

    if (q || category || type || status || state) {
      performSearch({
        q: q || undefined,
        page: page || 1,
        category: category || undefined,
        type: type || undefined,
        status: status || undefined,
        state: state || undefined,
        limit: 10,
      });
    }
  }, []);

  const performSearch = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await searchService.search(params);
      setResults(response.items || []);
      setTotal(response.total || 0);

      const urlParams = new URLSearchParams();
      if (params.q) urlParams.set('q', params.q);
      if (params.page && params.page > 1) urlParams.set('page', String(params.page));
      if (params.category) urlParams.set('category', params.category);
      if (params.type) urlParams.set('type', params.type);
      if (params.status) urlParams.set('status', params.status);
      if (params.state) urlParams.set('state', params.state);

      const queryString = urlParams.toString();
      const newUrl = queryString ? `/search?${queryString}` : '/search';
      router.replace(newUrl, { scroll: false });

    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Search failed';
      setError(typeof message === 'string' ? message : 'Something went wrong');
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch({
      q: query || undefined,
      page: 1,
      category: filters.category || undefined,
      type: filters.type || undefined,
      status: filters.status || undefined,
      state: filters.state || undefined,
      limit: 10,
    });
  };

  const handleClear = () => {
    setQuery('');
    setFilters({ category: '', type: '', status: '', state: '' });
    setResults([]);
    setTotal(0);
    router.push('/search');
  };

  const handlePageChange = (newPage: number) => {
    performSearch({
      q: query || undefined,
      page: newPage,
      category: filters.category || undefined,
      type: filters.type || undefined,
      status: filters.status || undefined,
      state: filters.state || undefined,
      limit: 10,
    });
  };

  const totalPages = Math.ceil(total / pagination.limit);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-md"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Find opportunities, schemes, jobs and programs
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or keyword..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Search
            </button>
            {(query || filters.category || filters.type || filters.status || filters.state) && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="">All Categories</option>
            <option value="education">Education</option>
            <option value="employment">Employment</option>
            <option value="entrepreneurship">Entrepreneurship</option>
            <option value="health">Health</option>
            <option value="social">Social Welfare</option>
            <option value="financial">Financial</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="">All Types</option>
            <option value="scheme">Scheme</option>
            <option value="job">Job</option>
            <option value="program">Program</option>
            <option value="fellowship">Fellowship</option>
            <option value="grant">Grant</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
            <option value="DRAFT">Draft</option>
          </select>

          <select
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="">All States</option>
            <option value="ANDHRA_PRADESH">Andhra Pradesh</option>
            <option value="KARNATAKA">Karnataka</option>
            <option value="KERALA">Kerala</option>
            <option value="TAMIL_NADU">Tamil Nadu</option>
            <option value="TELANGANA">Telangana</option>
          </select>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400 mb-6">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && results.length === 0 && (query || filters.category || filters.type || filters.status || filters.state) && (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      )}

      {!loading && !error && results.length === 0 && !query && !filters.category && !filters.type && !filters.status && !filters.state && (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Search for opportunities</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Enter a search term or use filters to find opportunities, schemes, jobs, and programs.
          </p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Found {total} result{total > 1 ? 's' : ''}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/opportunities/${result.slug}`}
                className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {result.title}
                </h3>
                {result.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                    {result.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  {result.category && (
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                      {result.category}
                    </span>
                  )}
                  {result.type && (
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
                      {result.type}
                    </span>
                  )}
                  {result.status && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      result.status === 'OPEN'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {result.status}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  {result.state && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {result.state.replace('_', ' ')}
                    </span>
                  )}
                  {result.lastDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Deadline: {new Date(result.lastDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(pagination.page - 1) * pagination.limit + 1} - {Math.min(pagination.page * pagination.limit, total)} of {total}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300">
                  Page {pagination.page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= totalPages}
                  className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
