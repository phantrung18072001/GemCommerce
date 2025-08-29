import { InputNumber, RadioGroup } from "./components";

const App = () => {
  const options = [
    { label: "%", value: "PERCENTAGE" },
    { label: "px", value: "PIXEL" },
  ];

  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-70 bg-[#151515] p-4 rounded-lg">
        <div className="space-y-4">
          <div className="flex gap-2 items-center ">
            <div className="text-sm w-25 text-[#AAAAAA]">Unit</div>
            <RadioGroup
              options={options}
              defaultValue={"PERCENTAGE"}
              className="h-9 w-35"
              onChange={(value) => {
                console.log(value);
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-sm w-25 text-[#AAAAAA]">Value</div>
            <InputNumber
              className="h-9 w-35"
              onChange={(value) => {
                console.log(value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
