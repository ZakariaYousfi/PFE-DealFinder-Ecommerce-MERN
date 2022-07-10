import axios from '../axios';
import { v4 as uid4 } from 'uuid';

export const changeCurrentThread = "changeCurrentThread";
export const addThread = "addThread";
export const addMessage = "addMessage";
export const setThreads = "setThreads";
export const addMessages = "addMessages";
export const changeIsMessaging = "changeIsMessaging";



export const SETTHREADS = (uid) => {
    // threadSelector uses this
    return (dispatch) => {
        return axios
            .get('/api/messages/conversations/'+uid)
            .then((res) => {

                    const { data } = res;
                    
                    if(data[0]) {
                    const threadz = data.map(conversation => {
            
                            const { lastMessage,  recipientObj } = conversation;
                        
                            const users = recipientObj.filter((elm) => elm._id !== uid)[0];
                            console.log(uid,users)
                            if (users)
                            return( {
                                        id : users._id,
                                        username : users.username,
                                        img : users.picture,
                                        lastMessage: lastMessage,
                                        messages:[]
                                    })
                            else return ({
                                id : uid4(),
                                        username : 'Deleted User',
                                        lastMessage: lastMessage,
                                        messages:[]
                            })
            
                            })
                            
                            console.log(threadz)

                            const currentThread = threadz[0].id || uid4();
                            console.log('uuidv4 :' + currentThread)

                    dispatch({type: setThreads, payload: {
                        currentThread : currentThread,
                        threads : threadz
                    }});         
                    if(currentThread.length === 24) dispatch(CHANGECURRENTTHREAD(uid,currentThread))
                }
                

            }).catch(err => console.log(err));
    }
}

export const CHANGECURRENTTHREAD = (id,threadId) => {

    return (dispatch) => {
        return axios.get('/api/messages/conversations/query/'+id+'/'+threadId)
        .then((res)=>{

                const { data } = res;
                console.log(data)
                if(data[0]) {
                const messages = data.map (( message ) => {
                    const { content , date, fromObj } = message;
                    const friend = fromObj[0];
                    return ({
                        username: friend.username,
                        text: content,
                        timestamp:date,
                        img: friend.picture,
                    })
                });
                
                dispatch({type:addMessages, payload:{
                     threadId : threadId, 
                     messages : messages
                    }})
                }
                else {
                    dispatch({type:changeCurrentThread,payload:threadId})
                    dispatch({type:changeIsMessaging})
                }
                }
                
        )
    } 
}

export const ADDMESSAGE = (id,to,content) => {

    return dispatch => {
        return axios.post('/api/messages/',{ id : id , to: to, content: content})
                .then((res) => {
               console.log(res)
                })
                .catch(err=>console.log(err))
        
        
    }
}
