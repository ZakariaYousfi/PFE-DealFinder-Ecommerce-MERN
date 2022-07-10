import { useSelector } from "react-redux";
import Chat from './Chat';
import { useDispatch } from 'react-redux';
import { addMessage, changeIsMessaging, addThread, SETTHREADS } from '../../actions/chatActions';
import { useEffect } from "react";


const ChatWrapper = () => {

    const { _id } = useSelector((state) => state.userReducer);

    const { currentThread, threads, isMessaging } = useSelector((state) => state.chatReducer);

    const currentThreadData = threads.find( thread => thread.id === currentThread);


    const dispatch = useDispatch();

    useEffect(() => {

       _id ? dispatch(SETTHREADS(_id)) : console.log("yikes")

    },[_id,dispatch]);



    const addMsg = (sender,receiver,message) => {
         if(sender.id!==_id && threads.find( thread => thread.id === sender.id ))  dispatch({type: addMessage, payload:{ id: sender.id , username: sender.username , text: message.text , img:sender.img, timestamp: message.timestamp }});
         else if(sender.id===_id && threads.find( thread => thread.id === message.receiver ) ) dispatch({type: addMessage, payload:{ id: message.receiver , username: sender.username , text: message.text , img:sender.img, timestamp: message.timestamp }});
         else if(sender.id!== _id) dispatch({type: addThread, payload:{ id: sender.id , username: sender.username , lastMessage: message.text ,  img:sender.img, timestamp: message.timestamp }});
         else dispatch({type: addThread, payload:{ id: message.receiver , username: receiver.username , lastMessage: message.text , img:receiver.img, timestamp: message.timestamp }});
         var messageBody = document.querySelector('#chat');
         messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }

    const changeMode = () => {
        dispatch({type:changeIsMessaging});
    }

    return <Chat id = {_id} currentThread = { currentThreadData }  addMsg = { addMsg } isMessaging = { isMessaging } changeMode = {changeMode} />
}

export default ChatWrapper;