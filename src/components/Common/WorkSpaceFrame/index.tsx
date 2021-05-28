import React, { KeyboardEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import ProfileImage from '../ProfileImage';
import { getProfileInfoSelector } from '../../../reducer/profile';
import { addRoom, deleteRoom, editRoom, getRoomsListInfo, getroomsListSelector } from '../../../reducer/roomsList';

import {
	AddInput,
	AddListItemBtn,
	CalendarIcon,
	ChatIcon,
	ContentBody,
	ContentTop,
	ContentWrap,
	DeleteAlertBtnWrap,
	EditButton,
	Frame,
	HomeIcon,
	InviteIcon,
	KanbanIcon,
	ListItem,
	ListItemWrap,
	ListTitle,
	ListTop,
	ListWrap,
	Pointer,
	ProfileLink,
	SideBar,
	SideBarBottom,
	SideBarMid,
	SideBarTop,
	SettingAlert,
} from './styles';

import { AiOutlineHome, AiOutlineUsergroupAdd, AiOutlineClose } from 'react-icons/ai';
import { RiAddBoxFill } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';

import calendarCheck from '@iconify/icons-bi/calendar-check';
import project24 from '@iconify/icons-octicon/project-24';
import chatTeardropDotsLight from '@iconify/icons-ph/chat-teardrop-dots-light';
import Modal from '../Modal';
import Button from '../Button';
import useInput from '../../../hooks/useInput';

interface frameInitType {
	workSpaceType: string;
	pointerTop: string;
	listType: string;
}

interface Props {
	children: ReactNode;
}

/*
	listData - 채널, 파트에 들어갈 데이터
*/

const WorkSpaceFrame = ({ children }: Props): JSX.Element => {
	const { roomsList } = useSelector(getroomsListSelector);
	const userInfo = useSelector(getProfileInfoSelector);
	const history = useHistory();
	const historyPath = history.location.pathname.split('/');
	const currentURL = historyPath[2];
	const currentAddress = historyPath[3];
	const currentRoom = historyPath[4];
	const dispatch = useDispatch();

	const [frameInitState, setFrameInitState] = useState<frameInitType>({
		workSpaceType: '',
		pointerTop: '',
		listType: '',
	});

	const [contentTop, setContentTop] = useState<string>(currentRoom);
	const [openList, setOpenList] = useState<boolean>(true);
	const [openAddInput, setOpenAddInput] = useState<boolean>(false);
	const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
	const [showEditAlert, setShowEditAlert] = useState<boolean>(false);
	const [SettingTarget, setSettingTarget] = useState<number>(0);
	const [listName, onChangeListName, setListName] = useInput<string>('');

	// TODO: room 조회
	useEffect(() => {
		const roomValue = {
			currentURL: currentURL,
			currentAddress: currentAddress,
		};
		dispatch(getRoomsListInfo(roomValue));
	}, []);

	const loadInitState = useCallback((): void => {
		if (currentAddress === 'chat') {
			const initState = {
				workSpaceType: '채팅',
				listType: '채널',
				pointerTop: '3px',
			};

			setFrameInitState(initState);
		}

		if (currentAddress === 'kanban') {
			const initState = {
				workSpaceType: '칸반보드',
				listType: '파트',
				pointerTop: '58px',
			};

			setFrameInitState(initState);
		}

		if (currentAddress === 'calendar') {
			const initState = {
				workSpaceType: '캘린더',
				listType: '파트',
				pointerTop: '111px',
			};

			setFrameInitState(initState);
		}
	}, []);

	// TODO: room 추가
	const addListItem = useCallback(
		(e: KeyboardEvent<HTMLInputElement>): void => {
			const value = e.currentTarget.value;
			if (value.trim() === '') {
				return;
			}

			if (e.key === 'Enter') {
				const roomValue = {
					currentURL: currentURL,
					currentAddress: currentAddress,
					roomName: { name: value },
				};

				dispatch(addRoom(roomValue));
				setContentTop(value);
				setOpenAddInput(false);
				history.push(`/workspace/${currentURL}/${currentAddress}/${value}`);
			}
		},
		[roomsList],
	);

	const openDeleteAlert = useCallback((e, index: number) => {
		e.preventDefault();
		e.stopPropagation();

		setShowDeleteAlert(true);
		setSettingTarget(index);
	}, []);

	const openEditAlert = useCallback((e, index: number) => {
		e.preventDefault();
		e.stopPropagation();

		setShowEditAlert(true);
		setSettingTarget(index);
	}, []);

	// TODO: room 삭제
	const deleteListItem = useCallback((): void => {
		const roomValue = {
			currentURL: currentURL,
			currentAddress: currentAddress,
			roomName: { name: roomsList[SettingTarget] },
		};

		dispatch(deleteRoom(roomValue));

		setShowDeleteAlert(false);
		setContentTop('General');
		setListName;
		history.push(`/workspace/${currentURL}/${currentAddress}/General`);
	}, [roomsList, SettingTarget]);

	// TODO: room 수정
	const onChangeListNameEnter = useCallback((): void => {
		setListName('');
		if (listName.trim() === '') {
			return;
		}

		const roomValue = {
			currentURL: currentURL,
			currentAddress: currentAddress,
			roomName: { name: roomsList[SettingTarget] },
			changeName: { name: listName },
		};
		console.log('입력값', listName);
		console.log('체크되는지 테스트', roomsList[SettingTarget]);
		console.log('roomValue', roomValue);

		dispatch(editRoom(roomValue));

		setContentTop(`${listName}`);
		setSettingTarget(SettingTarget);
		setListName('');
		setShowEditAlert(false);

		history.push(`/workspace/${currentURL}/${currentAddress}/${listName}`);
	}, [listName]);

	const activeListItem = useCallback((): void => {
		const items = document.querySelectorAll('.items');
		const currentIndex = roomsList.indexOf(contentTop);

		items.forEach(item => {
			item.classList.remove('active');
		});
		if (currentIndex !== -1) {
			items[currentIndex].classList.add('active');
		}
	}, [contentTop]);

	useEffect(() => {
		loadInitState();
	}, []);

	useEffect(() => {
		activeListItem();
	}, [contentTop]);

	return (
		<Frame>
			<SideBar>
				<SideBarTop>
					<HomeIcon to="/recruit">
						<AiOutlineHome />
					</HomeIcon>
				</SideBarTop>
				<SideBarMid>
					<Pointer style={{ top: `${frameInitState.pointerTop}` }} />
					<ChatIcon to={`/workspace/${currentURL}/chat/general`}>
						<Icon icon={chatTeardropDotsLight} />
					</ChatIcon>
					<KanbanIcon to={`/workspace/${currentURL}/kanban/general`}>
						<Icon icon={project24} />
					</KanbanIcon>
					<CalendarIcon to={`/workspace/${currentURL}/calendar/general`}>
						<Icon icon={calendarCheck} />
					</CalendarIcon>
				</SideBarMid>
				<SideBarBottom>
					<InviteIcon>
						<AiOutlineUsergroupAdd />
					</InviteIcon>
					<ProfileLink to={`/profile/${userInfo.id}`}>
						<ProfileImage
							width="35px"
							height="35px"
							profileImage={userInfo.uploadImage}
							profileColor={userInfo.profileColor}
							userName={userInfo.name}
						/>
					</ProfileLink>
				</SideBarBottom>
			</SideBar>
			<ListWrap>
				<ListTop>워크스페이스 {frameInitState.workSpaceType}</ListTop>
				<ListTitle className={openList ? 'on' : 'off'} onClick={() => setOpenList(openList => !openList)}>
					<MdKeyboardArrowDown />
					<span>{frameInitState.listType}</span>
				</ListTitle>
				<ListItemWrap className={openList ? 'on' : 'off'}>
					{roomsList.map((item, index) => (
						<ListItem
							className="items"
							key={index}
							to={`/workspace/${currentURL}/${currentAddress}/${item}`}
							onClick={() => setContentTop(item)}
						>
							{item}
							{index > 0 && <EditButton onClick={e => openEditAlert(e, index)} />}
							{index > 0 && <AiOutlineClose onClick={e => openDeleteAlert(e, index)} />}
						</ListItem>
					))}
					{openAddInput && <AddInput placeholder={`작성 후 Enter를 누르세요.`} onKeyPress={addListItem} />}
					<AddListItemBtn onClick={() => setOpenAddInput(openAddInput => !openAddInput)}>
						<RiAddBoxFill />
						<span>{frameInitState.listType} 추가</span>
					</AddListItemBtn>
				</ListItemWrap>
			</ListWrap>
			<ContentWrap>
				<ContentTop>
					<p>{contentTop}</p>
				</ContentTop>
				<ContentBody style={{ backgroundColor: `${currentAddress === 'kanban' && '#f6f6f8'}` }}>{children}</ContentBody>
			</ContentWrap>
			{showDeleteAlert && (
				<Modal setShowModal={setShowDeleteAlert}>
					<SettingAlert>
						<p>삭제 시 내용이 전부 사라집니다. 삭제 하시겠습니까?</p>
						<DeleteAlertBtnWrap>
							<Button
								size="medium"
								margin="0 10px 0 0"
								buttonType="cancel"
								clickEvent={() => setShowDeleteAlert(false)}
							>
								취소
							</Button>
							<Button size="medium" clickEvent={deleteListItem}>
								삭제
							</Button>
						</DeleteAlertBtnWrap>
					</SettingAlert>
				</Modal>
			)}
			{showEditAlert && (
				<Modal setShowModal={setShowEditAlert}>
					<SettingAlert>
						<p>변경하고 싶은 이름을 적어주세요</p>
						<input
							value={listName}
							placeholder="ex) 공지사항, 자료"
							onChange={onChangeListName}
							onKeyPress={e => e.key === 'Enter' && onChangeListNameEnter()}
						/>
					</SettingAlert>
				</Modal>
			)}
		</Frame>
	);
};

export default WorkSpaceFrame;