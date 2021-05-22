import CalendarHeader from './CalnedarHeader';
import CalendarBody from './CalendarBody';

export interface Props {

}

export default function CalendarContainer (props:Props) {
  // 여기서 달력 상태관리  
	return(
        <div>
          <CalendarHeader/>
          <CalendarBody />
        </div>
    )
}