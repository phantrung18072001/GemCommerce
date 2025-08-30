interface RadioButtonProps {
  value: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
  label: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  name,
  label,
  checked,
  onChange,
}) => {
  return (
    <label
      className={`rounded-md w-full h-full text-sm flex items-center justify-center cursor-pointer ${
        checked
          ? 'bg-[#424242] text-neutral-100'
          : 'text-neutral-400 hover:text-neutral-200'
      }`}
      onClick={onChange}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
