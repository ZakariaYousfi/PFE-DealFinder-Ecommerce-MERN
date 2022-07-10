import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const chatSlice = createSlice({

    name : 'chat',

    initialState : { 

                     currentThread : 'uuidv4()' , 
                     
                     threads : 
                                [
                                    {   id : 'uuidv4()',
                                        username : 'john travolta',
                                        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg',
                                        messages : [ {username : 'john travolta', text : 'hello son!' , timestamp : String(new Date())},
                                                    {name : 'Johnny Depp', text : 'she is a lier', timestamp : String(new Date())},
                                                    ],
                                        lastMessage : 'she is a lier',
                                    },
                                    {
                                        id : 'rerzrz',
                                        username : 'christian bale',
                                        img : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg',
                                        messages : [ {username : 'christian bale', text : 'i was once the batman!' , timestamp : String(new Date())},
                                        {name : 'Johnny Depp', text : 'you sure was!' , timestamp: String(new Date())},
                                                    ],
                                        lastMessage : 'you sure was!'
                                    }
                                
                                ] 
    },

    reducers : {
                changeCurrentThread : (state,action) => {
                    state.currentThread = action.payload
                },
                addThread : (state,action) => {
                    state.threads.push({
                        id : uuidv4(),
                        username : action.payload.username,
                        messages : action.payload.messages,
                    })
                },
                addMessage : (state,action) =>{
                state.threads.find( thread => thread.id === state.currentThread).messages.push(action.payload);
                },
                setThreads : (state,action) => {
                    state.currentThread = action.payload.currentThread;
                    state.threads = action.payload.threads;
                }
    }
})

export const { changeCurrentThread , addThread , addMessage, setThreads } = chatSlice.actions;

export default chatSlice.reducer;