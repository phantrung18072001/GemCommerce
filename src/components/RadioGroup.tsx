import { useState } from "react";
import RadioButton from "./RadioButton";

interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  className?: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  defaultValue,
  className,
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <div className={`flex bg-[#212121] rounded-lg p-0.5 ${className}`}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          checked={selected === option.value}
          onChange={() => {
            setSelected(option.value);
            onChange?.(option.value);
          }}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
