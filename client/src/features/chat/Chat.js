import MessageList from "../../components/MessageList";
import InputMessage from "../../components/InputMessage";
import ThreadSelector from "../../components/ThreadSelector";
import Pusher from 'pusher-js';
import { useEffect } from 'react';
import './Chatbox/Chatbox.css'

const Chat = ({ id , currentThread , addMsg , isMessaging , changeMode}) => {

 useEffect (

        () => {

            const pusher = new Pusher ("a660e59469e885f41db1",{ cluster : "eu"}) 
            const channel = pusher.subscribe('notifications-' + id );
            channel.bind('receive', (data) => {
                    const { sender , receiver, message } = data;
                    addMsg(sender,receiver,message);
            })
            return () => {
                channel.unbind_all();
                channel.unsubscribe();
            }
        }
        ,[id,addMsg]);

    if(id) return <div className = "whole">
                        <div className = "chat">                
                            <div id = "container"> 
                                <aside className= {isMessaging ? 'none' : 'unset'}>
                                    <ThreadSelector id = {id} />
                                </aside>
                                <main className = {isMessaging ? 'unset' : 'none'} >
                                    <MessageList className = "chat-content" {...currentThread } uid = { id } changeMode = { changeMode } />
                                    <InputMessage currentThreadId = { currentThread.id} id = {id} />
                                </main>
                            </div>
                        </div>
                    </div>

    else    return <h1 style = {{ marginLeft : '250px', marginTop :'100px'}}> Chat is Loading...</h1>
}


export default Chat