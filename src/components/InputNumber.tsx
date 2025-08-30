import { useCallback, useEffect, useRef, useState } from 'react';
import Tooltip from './Tooltip';

interface InputNumberProps {
  onChange?: (value: number) => void;
  className?: string;
  min?: number;
  max?: number;
  value?: number;
}

const InputNumber: React.FC<InputNumberProps> = ({
  onChange,
  className,
  min,
  max,
  value: currentValue,
}) => {
  const [value, setValue] = useState<string>('');
  const prevValue = useRef<number>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const updateValue = useCallback(
    (newVal: number) => {
      prevValue.current = newVal;
      setValue(String(newVal));
      onChange?.(newVal);
    },
    [onChange]
  );

  const handleBlur = () => {
    const v = value.replace(',', '.');
    const match = v.match(/-?\d+(\.\d+)?/);
    let num = match && match[0] !== '' ? parseFloat(match[0]) : 0;

    if (isNaN(num) && min) num = min;
    if (min && num < min) num = min;
    if (max && num > max && prevValue.current !== null) num = prevValue.current;
    updateValue(num);
  };

  const numValue = parseFloat(value) || 0;

  const increase = () => {
    updateValue(numValue + 1);
  };

  const decrease = () => {
    updateValue(numValue - 1);
  };

  const disabledDecrease = min ? numValue <= min : false;
  const disabledIncrease = max ? numValue >= max : false;

  useEffect(() => {
    if (currentValue) {
      updateValue(currentValue);
    }
  }, [currentValue, updateValue]);

  return (
    <div
      className={`flex items-center justify-center rounded-md bg-[#212121]
        has-[input:hover]:bg-[#424242] has-[input:focus]:border-[#3c67ff] has-[input:focus]:border-1 has-[input:focus]:border-solid ${className}
      `}
    >
      <Tooltip
        content={disabledDecrease ? `Value must greater than ${min}` : ''}
      >
        <button
          className="h-9 w-9 cursor-pointer rounded-tl-md rounded-bl-md hover:bg-[#424242] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={decrease}
          disabled={disabledDecrease}
        >
          -
        </button>
      </Tooltip>
      <div className="flex-1 bg-transparent">
        <input
          type="text"
          name="number-input"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          className="w-full border-none outline-none text-center text-sm"
        />
      </div>
      <Tooltip
        content={disabledIncrease ? `Value must smaller than ${max}` : ''}
      >
        <button
          className="h-9 w-9 cursor-pointer rounded-tr-md rounded-br-md hover:bg-[#424242] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={increase}
          disabled={disabledIncrease}
        >
          +
        </button>
      </Tooltip>
    </div>
  );
};

export default InputNumber;
