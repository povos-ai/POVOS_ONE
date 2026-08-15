"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { searchService } from "@/services/search.service";
import { SearchResult } from "@/types/search.types";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{ category?: string; type?: string; status?: string; state?: string }>({});
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, any> = {};
      if (search) params.q = search;
      if (filters.category) params.category = filters.category;
      if (filters.type) params.type = filters.type;
      if (filters.status) params.status = filters.status;
      if (filters.state) params.state = filters.state;
      params.page = pagination.page;
      params.limit = pagination.limit;

      const response = await searchService.search(params);
      setOpportunities(response.items || []);
      setTotal(response.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed to load opportunities");
      setOpportunities([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, filters, pagination.page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 });
    fetchData();
  };

  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  const totalPages = Math.ceil(total / pagination.limit);

  if (loading && !opportunities.length) {
    return <div className="p-6 text-center">Loading opportunities...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Opportunities</h2>
        <Link href="/opportunities/create" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          + New Opportunity
        </Link>
      </div>

      {/* Search & Filters */}
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search by title or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <select
            value={filters.category || ""}
            onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
        <div>
          <select
            value={filters.type || ""}
            onChange={(e) => setFilters({ ...filters, type: e.target.value || undefined })}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            <option value="Grant">Grant</option>
            <option value="Loan">Loan</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div>
          <select
            value={filters.status || ""}
            onChange={(e) => setFilters({ ...filters, status: e.target.value || undefined })}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
        <div>
          <select
            value={filters.state || ""}
            onChange={(e) => setFilters({ ...filters, state: e.target.value || undefined })}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">All States</option>
            <option value="Bihar">Bihar</option>
            <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
          </select>
        </div>
        <button type="submit" className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300">
          Apply Filters
        </button>
      </form>

      {/* Results count */}
      {!loading && total > 0 && (
        <div className="text-sm text-gray-500">
          Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, total)} of {total} opportunities
        </div>
      )}

      {/* Opportunity List */}
      {opportunities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded shadow border border-gray-100">
          <p className="text-gray-500">No opportunities found.</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms or filters.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {opportunities.map((opp) => (
            <Link key={opp.id} href={`/opportunities/${opp.slug}`} className="block">
              <div className="bg-white p-4 rounded shadow border border-gray-100 hover:shadow-md transition cursor-pointer">
                <h3 className="font-semibold text-lg">{opp.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{opp.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {opp.category && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{opp.category}</span>}
                  {opp.type && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{opp.type}</span>}
                  {opp.status && <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">{opp.status}</span>}
                  {opp.state && <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">{opp.state}</span>}
                  {opp.lastDate && (
                    <span className="text-xs text-gray-400">Deadline: {new Date(opp.lastDate).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
