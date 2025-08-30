import { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [show, setShow] = useState(false);

  if (!content) return children;
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none">
          <div className="relative rounded bg-[#212121] px-3 py-1.5 text-xs text-[#F9F9F9] shadow-lg whitespace-nowrap">
            {content}
            <div
              className="absolute left-1/2 top-full -translate-x-1/2 h-0 w-0
                          border-l-4 border-l-transparent
                          border-r-4 border-r-transparent
                          border-t-4 border-t-[#212121]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
