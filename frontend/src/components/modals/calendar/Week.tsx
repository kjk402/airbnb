import styled from "styled-components";

export default function Week() {
	return (
		<StyleRow>
			<StyleDay>1</StyleDay>
			<StyleDay>2</StyleDay>
			<StyleDay>3</StyleDay>
			<StyleDay>4</StyleDay>
			<StyleDay>5</StyleDay>
			<StyleDay>6</StyleDay>
			<StyleDay>7</StyleDay>
		</StyleRow>
	);
}

const StyleRow = styled.tr`
	display: flex;
	justify-content: space-between;
	td {
		width: 48px;
		height: 48px;
	}
`;

const StyleDay = styled.td`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	:hover {
		border: 1px solid #b8b8b8;
		cursor: pointer;
	}
`;
