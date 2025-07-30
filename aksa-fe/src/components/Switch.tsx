import { useState } from "react";

type Option = {
  id: string;
  label: string;
};

type SwitchProps = {
  options: Option[];
  initialValue: string;
  onChange: (value: string) => void;
  name?: string;
};

export default function Switch(props: SwitchProps) {
  const [selectedOption, setSelectedOption] = useState(props.initialValue);

  const handleChange = (value: string) => {
    setSelectedOption(value);
    props.onChange(value);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-flex overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700 min-w-fit"
        role="radiogroup"
        aria-labelledby="worktype-label"
      >
        {props.options.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className="cursor-pointer transition-colors"
          >
            <input
              type="radio"
              name={props.name || "switch-options"} // Use provided name or default
              id={option.id}
              className="sr-only"
              checked={selectedOption === option.id}
              onChange={() => handleChange(option.id)}
              aria-checked={selectedOption === option.id}
            />
            <span
              className={`
                relative inline-flex items-center h-full py-2 px-4 text-sm select-none
                ${
                  selectedOption === option.id
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground"
                }
              `}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
