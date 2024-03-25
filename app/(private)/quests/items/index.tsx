import { Quest } from '@/model/quest'
import { validateQuest } from '@/services'
import Link from 'next/link'
import useSWR from 'swr'

export default function QuestItem({ data }: { data: Quest }) {
  const { data: validation, mutate } = useSWR(data.code, () => validateQuest(data.code))
  return (
    <div
      className={`p-4 rounded ${
        validation?.is_valid ? 'bg-[#C0B9A7] flex-row items-center gap-5 justify-between' : 'bg-[#D6CCB5] flex-col'
      } flex w-full`}>
      <div className='flex flex-col gap-4'>
        <div className='text-[#292929] text-sm'>{data.description}</div>
        {!validation?.is_valid && data?.campaign_social_actions?.[0]?.target ? (
          <Link
            className='text-[#6D3A0A] font-medium italic flex items-center gap-2 cursor-pointer'
            href={`https://twitter.com/AuraNetworkHQ/status/${data.campaign_social_actions[0].target}`}
            target='_blank'>
            <div className='w-[9px] h-[9px] rounded-sm rotate-45 bg-[#E75858]'></div>
            Go to{' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='15'
              height='14'
              viewBox='0 0 15 14'
              fill='none'
              className='block'>
              <path
                d='M0.761972 0L6.16721 7.7218L0.727905 14H1.95217L6.71438 8.50322L10.562 14H14.7279L9.01842 5.84394L14.0814 0H12.8571L8.47149 5.06227L4.92791 0H0.761972ZM2.56231 0.963405H4.47612L12.9273 13.0366H11.0135L2.56231 0.963405Z'
                fill='#6D3A0A'
              />
            </svg>
          </Link>
        ) : undefined}
      </div>
      {!validation?.is_valid ? (
        <div className='border-t border-[#8D857E] flex justify-center mt-4'>
          <button className='text-sm text-[#6D3A0A] font-medium pt-[10px]' onClick={() => mutate(data.code)}>
            Refresh
          </button>
        </div>
      ) : (
        <div>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M9.00015 16.1698L5.53015 12.6998C5.34317 12.5129 5.08957 12.4078 4.82515 12.4078C4.56072 12.4078 4.30712 12.5129 4.12015 12.6998C3.93317 12.8868 3.82813 13.1404 3.82812 13.4048C3.82813 13.5358 3.85391 13.6654 3.90402 13.7864C3.95412 13.9073 4.02756 14.0173 4.12015 14.1098L8.30015 18.2898C8.69015 18.6798 9.32015 18.6798 9.71015 18.2898L20.2901 7.70983C20.4771 7.52286 20.5822 7.26926 20.5822 7.00483C20.5822 6.74041 20.4771 6.48681 20.2901 6.29983C20.1032 6.11286 19.8496 6.00781 19.5851 6.00781C19.3207 6.00781 19.0671 6.11286 18.8801 6.29983L9.00015 16.1698Z'
              fill='#02B94B'
            />
          </svg>
        </div>
      )}
    </div>
  )
}
