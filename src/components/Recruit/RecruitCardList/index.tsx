import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RecruitListDataType } from '../../../types/types';
import getLoginInfo from '../../../utils/getLoginInfo';

import RecruitCard from '../RecruitCard';
import Search from '../Search';

import { CardListContainer } from './styles';

const RecruitCardList = (): JSX.Element => {
	const [recruitList, setRecruitList] = useState<RecruitListDataType[]>([
		{
			commentCount: 0,
			createdAt: '',
			detailDesc: '',
			detailTitle: '',
			id: 0,
			name: '',
			period: '',
			recruitImage: '',
			recruitMembers: '',
			requireStack: [],
			serviceStep: '',
			simpleDesc: '',
			updatedAt: '',
			view: 0,
		},
	]);

	useEffect(() => {
		const { accessToken, loginType } = getLoginInfo();

		// redux로 변경 예정
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/recruitList/1`, {
				headers: { authorization: `Bearer ${accessToken}`, loginType },
			})
			.then(data => {
				setRecruitList(data.data.boardList);
			});
	}, []);

	return (
		<CardListContainer>
			<Search />
			{recruitList && recruitList.map((data, index) => <RecruitCard key={index} data={data} />)}
		</CardListContainer>
	);
};
export default RecruitCardList;
