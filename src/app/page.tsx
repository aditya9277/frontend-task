"use client";
import React, { useEffect, useMemo, useState } from "react";
import SearchInput from "@/components/SearchInput";
import UserTable from "@/components/UserTable";
import type { User } from "@/types/user";
import { SortKey, SortDirection } from "@/types/sort";

// Custom debounce hook for search optimization
function userDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const highlight = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>(""); // Bonus: role filtering
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortDirection>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling
  const debouncedSearch = userDebounce(search, 300); // 300ms debounce

  //loading users from public/data.json
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error("Failed to load user data");
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Three-state sorting: asc -> desc -> none
  const handleSort = (key: "name" | "role") => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder("asc");
    } else {
      const newOrder =
        sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc";
      setSortOrder(newOrder);
      if (newOrder === null) setSortKey(null);
    }
  };

  // Combined search and role filtering with memoized performance
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesRole = !roleFilter || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });

    if (sortKey && sortOrder) {
      filtered.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        const comparison = aValue.localeCompare(bValue);
        return sortOrder === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [users, debouncedSearch, roleFilter, sortKey, sortOrder]);

  // Bonus: get unique roles for filter dropdown
  const availableRoles = useMemo(() => {
    const roles = [...new Set(users.map((user) => user.role))];
    return roles.sort();
  }, [users]);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Frontend Developer Intern – Interview Task
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchInput value={search} onChange={setSearch} />
            </div>
            <div className="sm:w-48">
              {/* Bonus: Role filter dropdown */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Roles</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-8">
              <div className="text-gray-500">Loading users...</div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-8">
              <div className="text-red-500">{error}</div>
            </div>
          )}

          {/* Main content with result counter */}
          {!loading && !error && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredAndSortedUsers.length} of {users.length} users
                {debouncedSearch && ` for "${debouncedSearch}"`}
                {roleFilter && ` in role "${roleFilter}"`}
              </div>
              <UserTable
                users={filteredAndSortedUsers}
                searchQuery={debouncedSearch}
                onSort={handleSort}
                sortKey={sortKey}
                sortOrder={sortOrder}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
