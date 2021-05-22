import Week from './Week';

interface Props {

}

export default function CalendarCore (props: Props) {
  // 연, 월, 일을 프랍으로 받아
  // 핵심 캘린더 콘텐츠 하나 (개별 월 달력)이 들어가는 컴포넌트.
 
  return (
    <div>
      <table>
        <tbody>
            <Week />
            <Week />
            <Week />
            <Week />
            <Week />
            <Week />
        </tbody>
      </table>
    </div>
  )
}