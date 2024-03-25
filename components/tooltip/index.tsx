import { Tooltip as NextTooltip } from '@nextui-org/react';
import { ReactNode } from 'react';

export default function Tooltip({content, children}:{content: string, children: ReactNode}) {
  return (
    <NextTooltip
      content={content}
      classNames={{
        content: [
          'text-[#fff] rounded-[8px] backdrop-blur-[6px] border border-[#F56161] bg-[linear-gradient(180deg,rgba(117,20,20,0.50)_0%,rgba(133,7,7,0.50)_0.01%,rgba(244,63,63,0.50)_100%)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
        ],
      }}>
      {children}
    </NextTooltip>
  )
}