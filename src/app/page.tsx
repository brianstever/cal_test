// pages/index.js
import MyCalendar from '../app/components/Calendar';

export default function Home() {
  return (
    <div className='p-12'>
      <h1 className='text-xl font-bold font-mono mb-4'>Test_Calendar</h1>
      <p className='max-w-[600px] text-sm font-mono mb-4'>Add shifts by clicking &apos;manage shifts&apos; and events will be automatically generated for taking melatonin and sleep. This is not connected to a database so events will be deleted when the page is refreshed. This is purely for testing purposes.</p>
      <MyCalendar />
    </div>
  );
}
