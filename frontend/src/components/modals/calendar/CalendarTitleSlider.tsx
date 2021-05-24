import styled from 'styled-components';
import  CalendarTitle from './CalendarTitle';

export interface Props {

}

export default function CalendarTitleSlider (props:Props) {
  // n년 n월 , n년 n+1월

    return (
      <StyleTitleSlider>
        <CalendarTitle />
        <CalendarTitle />
      </StyleTitleSlider>
    )

}

const StyleTitleSlider = styled.div`
  display:flex;
  width: 80%;
  justify-content: space-around;
`