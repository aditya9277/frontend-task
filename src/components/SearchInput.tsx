interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchInput({
  placeholder = "Search by name or email...",
  value, //here was the issue. a blank value was passed making it an uncontrolled component
  onChange,
}: SearchInputProps) {
  // TODO: Fixed - SearchInput now properly accepts value and onChange props
  // The component re-renders but the input doesn't update. Can you spot it?

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
}
