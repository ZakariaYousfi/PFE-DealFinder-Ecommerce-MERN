import React from 'react';
import LeftNav from '../components/LeftNav';
import ChatWrapper from '../features/chat/ChatWrapper';

const Chat = () => {


    return (
        <div className="chat-p-container">
            <LeftNav />
            <ChatWrapper />
        </div>


    )
};

export default Chat;