import CalendarCore from './CalendarCore';

export interface Props {

}

export default function CalendarCoreSlider (props:Props) {
  // CalendarCore를 덮고서 슬라이딩 해주는 컴포넌트.
  // CalendarCore 는 왼쪽 2개, 가운데 2개, 오른쪽 2개 있어야 슬라이딩 가능..
  return (
    <div>
      {/* <CalendarCore />
      <CalendarCore /> */}
      <CalendarCore />
      <CalendarCore />
      {/* <CalendarCore />
      <CalendarCore /> */}
    </div>
  )
} 