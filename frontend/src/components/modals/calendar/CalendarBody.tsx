import  styled from 'styled-components';
import CalendarCoreSlider from './CalendarCoreSlider';

export interface Props {

}

export default function CalendarBody(props:Props) {
  
  return (
    <StyleBody>
      <CalendarCoreSlider />
    </StyleBody>
  )
}

const StyleBody = styled.div`
  width: 100%;
  height: 400px; 
  /* 위의 height 는 임시. */
  border: 1px solid red;
`