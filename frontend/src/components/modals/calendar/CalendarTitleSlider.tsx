import  CalendarTitle from './CalendarTitle';

export interface Props {

}

export default function CalendarTitleSlider (props:Props) {
  // n년 n월 , n년 n+1월

    return (
      <div>
        <CalendarTitle />
        <CalendarTitle />
      </div>
    )

}