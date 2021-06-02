import styled from 'styled-components';
import LandingMain2 from '../../../images/LandingMain2.jpg';

export const LandingFirstContainer = styled.div`
	${({ theme }) => theme.align.flexCenter};
	width: 100%;
	min-height: 100vh;
	background: no-repeat center/cover url(${LandingMain2});
`;

export const Dimed = styled.div`
	${({ theme }) => theme.align.flexCenter};
	width: 100%;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.5);
`;

export const ContentsWrapper = styled.div`
	${({ theme }) => theme.align.flexCenter};
	flex-direction: column;
	width: 100%;
`;

export const MainMessage = styled.div`
	${({ theme }) => theme.align.flexCenter};
	margin-bottom: 20px;
	font-family: NanumSquareEB;
	font-size: 90px;
	color: #343434;
`;

export const SubMessage = styled.div`
	${({ theme }) => theme.align.flexCenter};
	margin-bottom: 132px;
	font-family: NanumSquareB;
	font-size: 40px;
	color: #343434;
`;

export const FreeExpButton = styled.div`
	${({ theme }) => theme.align.flexCenter};

	& > button {
		${({ theme }) => theme.align.flexCenter};
		cursor: pointer;
		position: relative;
		z-index: 8;
		transition: 0.3s;
		width: 200px;
		height: 60px;
		font-family: NanumSquareEB;
		font-size: 20px;
		color: #fff;
		background-color: #545454;
		border-radius: 5px;

		& > p {
			margin-top: 4px;
		}

		&:hover {
			color: #ddd;
			background-color: #343434;
		}
	}
`;

// ----------------TODO: 맨 위로 가기 버튼----------------

export const BackToTopButton = styled.button`
	cursor: pointer;
	position: fixed;
	right: 2vw;
	bottom: 4vh;
	z-index: 99;
	width: 60px;
	hieght: 60px;

	& > img {
		width: 100%;
		transform: rotate(180deg);
	}

	& > p {
		margin-top: -8px;
		font-family: NanumSquareB;
		font-size: 14px;
	}
`;
