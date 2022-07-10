import { useDispatch,useSelector } from 'react-redux';
import { CHANGECURRENTTHREAD } from '../actions/chatActions';

const ThreadSelector = ({id}) => {

    let { threads } = useSelector((state) => state.chatReducer);
    const dispatch = useDispatch();




            return <div>
                        <header >
                            <input type="text" placeholder="search"/>
                        </header>
                        <ul>
                       { threads.map (
                                        (thread,key) => {
                                            return <li key = {key} onClick = {() => { if(thread.id.length===24) dispatch(CHANGECURRENTTHREAD(id,thread.id));
                                            
                                                                                                        }}>
                                                
                                                <img height="50" width="50" src={thread.img} alt=""/>
                                                <div>
                                                    <h2><b>{thread.username}</b></h2>
                                                    <h3>
                                                         {thread.lastMessage.length>25 ? thread.lastMessage.toLowerCase().slice(0,25)+'...' : thread.lastMessage}
                                                        
                                                    </h3>
                                                </div>
                                                </li>
                                        }
                                    ) }
  
                            
                        </ul>
                    </div>

    
}



export default ThreadSelector;