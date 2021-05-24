import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useInput from '../../../hooks/useInput';
import useSocket from '../../../hooks/useSocket';
// import { getTotalChatSelector } from '../../../reducer/chat';
import { getProfileInfoSelector } from '../../../reducer/profile';
import { ChatDataType } from '../../../types/types';
import WorkSpaceFrame from '../../Common/WorkSpaceFrame';
import ChatZone from '../ChatZone';
import Textarea from '../Textarea';

const WorkSpaceChat = (): JSX.Element => {
	const listData = ['공지사항'];
	const profileInfo = useSelector(getProfileInfoSelector);
	// const totalChat = useSelector(getTotalChatSelector);
	const [chat, onChangeChat, setChat] = useInput<string>('');
	const { projectUrl } = useParams<{ projectUrl: string }>();
	const [socket] = useSocket(projectUrl);

	// TODO: test socket.io
	const [chatBucket, setChatBucket] = useState<ChatDataType[]>([]);

	// TODO: 이전까지의 전체 채팅 내용을 불러온다.
	useEffect(() => {
		// console.log('socket', socket);
		socket.on('totalMessageGet', (chats: any) => {
			// console.log('chats??????????', chats);

			const data = chats.map((chat: any) => {
				return { name: chat.writer.name, message: chat.text };
			});
			setChatBucket(data);
		});
		socket.emit('totalMessageGet');
	}, []);

	// TODO: 메세지를 받으면 재렌더링 한다.
	useEffect(() => {
		socket.on('message', ({ name, message }: any) => {
			console.log('name, message', name, message);
			setChatBucket([...chatBucket, { name, message }]);
		});
	}, []);

	const onSubmitForm = useCallback(
		(e: FormEvent<Element>): void => {
			e.preventDefault();
			const data = {
				name: profileInfo.name,
				message: chat,
			};
			socket.emit('message', data);
			setChat('');
		},
		[chat],
	);

	return (
		<WorkSpaceFrame listData={listData}>
			<ChatZone chatBucket={chatBucket} />
			<Textarea onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} chat={chat} placeholder={'테스트 중'} />
		</WorkSpaceFrame>
	);
};

export default WorkSpaceChat;
