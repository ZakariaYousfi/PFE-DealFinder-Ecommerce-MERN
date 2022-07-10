import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ADDMESSAGE } from '../actions/chatActions';




const InputMessage = ({currentThreadId , id}) => {

    const InputRef = useRef();

    const dispatch = useDispatch();

    const addMsg = async (e) => {

        e.preventDefault();
        const to = currentThreadId;

        const content = InputRef.current.value;


        dispatch(ADDMESSAGE( id,to,content ));

        
      //  await axios.post('/message/post',{  sender : _id , receiver : receiver  , message : message  }).then(res => console.log(res)).catch(err=>console.log(err));

        InputRef.current.value = '';
    }

    return <footer>
                <form onSubmit = { addMsg }>
                <input  ref = {InputRef} placeholder="Type your message"></input>
                <button>Send</button>
                </form>
            </footer>
    

}
    /* <form onSubmit = { addMsg } >
            <input type = 'text' ref = {InputRef} placeholder = 'enter your message' />
            <button type = 'submit' >Send</button>    
</form> */

export default InputMessage;