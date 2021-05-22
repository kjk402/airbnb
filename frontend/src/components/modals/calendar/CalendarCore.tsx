interface Props {

}

export default function CalendarCore (props: Props) {
  // 연, 월, 일을 프랍으로 받아
  // 핵심 캘린더 콘텐츠 하나 (개별 월 달력)이 들어가는 컴포넌트.
 
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>일</td>
            <td>월</td>
            <td>화</td>
            <td>수</td>
            <td>목</td>
            <td>금</td>
            <td>토</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
        {/* ... */}
        </tbody>
      </table>
    </div>
  )
}