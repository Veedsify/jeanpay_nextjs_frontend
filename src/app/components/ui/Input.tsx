import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { ChangeEvent } from "react";

export default function Input({
  placeholder,
  searchCallback,
}: {
  placeholder: string;
  searchCallback: (query: string) => void;
}) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchCallback(e.target.value);
  };

  return (
    <div className="rounded-full flex items-center min-w-2xs py-3 px-4 bg-gray-10">
      <input
        type="text"
        className="flex-1 ring-0 border-0 outline-0"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <MagnifyingGlassIcon />
    </div>
  );
}
