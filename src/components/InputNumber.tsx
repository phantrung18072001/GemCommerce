interface InputNumberProps {
  onChange: (value: number) => void;
  className?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({ onChange, className }) => {
  return (
    <div
      className={`flex items-center justify-center bg-[#212121] rounded-md ${className}`}
    >
      <button className="h-full w-9 cursor-pointer">-</button>
      <div className="flex-1">
        <input
          type="text"
          name="number-input"
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full border-none outline-none"
        />
      </div>
      <button className="h-full w-9 cursor-pointer">+</button>
    </div>
  );
};

export default InputNumber;
