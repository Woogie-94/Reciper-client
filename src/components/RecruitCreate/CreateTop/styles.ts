import styled from 'styled-components';

export const CreatTopContainer = styled.div`
	width: 100%;
	padding: 40px 0 10px;
	border-bottom: 1px solid ${({ theme }) => theme.color.lineColor};
	border-top: 1px solid ${({ theme }) => theme.color.lineColor};
`;

export const CreateInputContainer = styled.div`
	${({ theme }) => theme.align.flexVertical}
`;

export const CreateRecruitList = styled.div`
	margin-bottom: 10px;
	& > span {
		margin-left: 10px;
		color: #888;
	}
`;

export const RecruitStackWrap = styled.div`
	margin-top: 10px;
`;

export const RecruitStackClear = styled.span`
	cursor: pointer;
	margin-left: 10px;
	font-size: 12px;
	color: #666;
`;

const RecruitListBtn = styled.button`
	margin-left: 15px;
	font-size: 14px;
`;

export const AddRecruitListBtn = styled(RecruitListBtn)`
	color: ${({ theme }) => theme.color.pointColor};
`;
export const DeleteRecruitListBtn = styled(RecruitListBtn)`
	color: ${({ theme }) => theme.color.warningColor};
`;
