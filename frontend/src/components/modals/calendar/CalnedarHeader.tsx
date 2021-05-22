import CalendarTitleSlider from './CalendarTitleSlider';

export interface Props {

}

export default function CalendarHeader (props:Props) {
	//  화살표 , titleSlider, 화살표를 자식으로 받음
    return (
        <div>
					<span> Larrow </span>
            <CalendarTitleSlider />
					<span> Rarrow </span>
        </div>
    )
}