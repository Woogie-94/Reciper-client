import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { profileInfoDataType } from '../types/types';
import { RootStateOrAny } from 'react-redux';

const localStorage_loginInfo = window.localStorage.getItem('loginInfo') as string;
const loginInfo = JSON.parse(localStorage_loginInfo);
const userAccessToken = loginInfo.accessToken;
const userLoginType = loginInfo.loginType;

// TODO: Thunk 실행
export const getProfileInfo = createAsyncThunk('profileInfo', async (): Promise<void> => {
	const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/profile`, {
		headers: {
			authorization: `Bearer ${userAccessToken}`,
			loginType: userLoginType,
		},
	});
	return response.data;
});

// TODO: 초기 상태
const initialState: profileInfoDataType = {
	UpdatedAt: '',
	about_me: '',
	career: {
		office: '',
		job: '',
		period: '',
	},
	createdAt: '',
	email: '',
	stacks: [],
	git_id: '',
	id: null,
	isOpen: false,
	mobile: '',
	name: '',
	profile_color: '',
	profile_image: '',
};

// TODO: slice 실행
export const profileInfoSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: {
		[getProfileInfo.fulfilled.type]: (state, { payload }: PayloadAction<profileInfoDataType>) => payload,
	},
});

export const getProfileInfoSelector = (state: RootStateOrAny): profileInfoDataType => state.profileInfoSlice;
