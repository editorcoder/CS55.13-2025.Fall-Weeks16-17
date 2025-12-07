/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
Tag.tsx
2025-12-07
*/

// Card filter tag

interface TagProps {
  type: string;
  value: string;
  updateField: (type: string, value: string) => void;
}

// Tag component
export default function Tag({ type, value, updateField }: TagProps) {
  return (
    <span className="">
      {value}
      <button
        type="button"
        aria-label="Remove"
        onClick={() => updateField(type, "")}
      >
        X
      </button>
    </span>
  );
}

