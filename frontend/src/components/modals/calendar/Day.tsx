import styled from 'styled-components';
interface Props {
	year: number;
	month: number;
	firstWeekDay: number;
	index: number;
	d: number;
	lastDay : number;
}
export default function Day({ year, month, firstWeekDay, index, d, lastDay  }: Props) {

	
	if(d > lastDay || d <= 0) return<StyleTd></StyleTd>;
	return <StyleTd>{d}</StyleTd>;
}

const StyleTd = styled.td`
	
		width: 48px;
		height: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
		:hover {
			border: 1px solid #b8b8b8;
			cursor: pointer;
		}
	
`