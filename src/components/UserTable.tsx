import { User } from "@/types/user";
import { SortDirection, SortKey } from "@/types/sort";

interface UserTableProps {
  users: User[];
  searchQuery?: string; // Added for highlighting search matches
  onSort?: (key: "name" | "role") => void; // Added for sorting functionality
  sortKey?: SortKey; // Added for sort state
  sortOrder?: SortDirection; // Added for sort direction
}

// Helper function to highlight search matches using <mark> tags
const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

export default function UserTable({
  users = [],
  searchQuery = "",
  onSort,
  sortKey,
  sortOrder,
}: UserTableProps) {
  // Putting up sort idicators in the header
  const getSortIcon = (columnKey: "name" | "role") => {
    if (sortKey !== columnKey) return " ↕️";
    return sortOrder === "asc" ? " ⬆️" : sortOrder === "desc" ? " ⬇️" : " ↕️";
  };

  // Getting the aria-sort attribute for accessibility
  const getSortAttribute = (columnKey: "name" | "role") => {
    if (sortKey !== columnKey) return "none";
    return sortOrder === "asc"
      ? "ascending"
      : sortOrder === "desc"
      ? "descending"
      : "none";
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            {/* Clickable header with sort functionality and accessibility */}
            <th
              className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-100 select-none"
              onClick={() => onSort?.("name")}
              aria-sort={getSortAttribute("name")}>
              Name{getSortIcon("name")}
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Email
            </th>
            {/* Clickable header with sort functionality and accessibility */}
            <th
              className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-100 select-none"
              onClick={() => onSort?.("role")}
              aria-sort={getSortAttribute("role")}>
              Role{getSortIcon("role")}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0
            ? users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  {/* Name with search highlighting */}
                  <td
                    className="border border-gray-300 px-4 py-2"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(user.name, searchQuery),
                    }}
                  />
                  {/* Email with search highlighting */}
                  <td
                    className="border border-gray-300 px-4 py-2"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(user.email, searchQuery),
                    }}
                  />
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role}
                  </td>
                </tr>
              ))
            : null}

          {/* Empty state with better messaging */}
          {users.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                {searchQuery
                  ? "No users found matching your search."
                  : "No users to display"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
