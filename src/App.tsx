import { useState } from 'react';
import { InputNumber, RadioGroup } from './components';

const UNIT = {
  PERCENTAGE: 'PERCENTAGE',
  PIXEL: 'PIXEL',
};

const App = () => {
  const [unit, setUnit] = useState(UNIT.PERCENTAGE);
  const [value, setValue] = useState(0);

  const options = [
    { label: '%', value: UNIT.PERCENTAGE },
    { label: 'px', value: UNIT.PIXEL },
  ];

  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-70 bg-[#151515] p-4 rounded-lg">
        <div className="space-y-4">
          <div className="flex gap-2 items-center ">
            <div className="text-sm w-25 text-[#AAAAAA]">Unit</div>
            <RadioGroup
              name="unit"
              options={options}
              defaultValue={unit}
              className="h-9 w-35"
              onChange={(value) => {
                setUnit(value);
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-sm w-25 text-[#AAAAAA]">Value</div>
            <InputNumber
              className="h-9 w-35"
              min={0}
              value={unit === UNIT.PERCENTAGE && value > 100 ? 100 : value}
              max={unit === UNIT.PERCENTAGE ? 100 : undefined}
              onChange={(value) => {
                setValue(value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
