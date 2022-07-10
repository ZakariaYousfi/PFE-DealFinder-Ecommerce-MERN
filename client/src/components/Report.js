import { useRef, useState } from 'react';
import axios from '../axios';


const Report = ({ reportedData, reportedDataId }) => {

    const inputRef = useRef();  
    
    const [reported, setReported ] = useState(false);

    const apiCall = () => {

        const reportBody = inputRef.current.value;

        axios.post('/api/reports/',{reportedData, reportedDataId, reportBody })
                    .then((res) => res.data ? setReported(true) : console.log('no response'))
                            .catch(err => console.log(err));

        inputRef.current.value = ''; 
        

    }


    return <>

                <form onSubmit = { apiCall }>
                
                    <input ref = { inputRef } ></input>

                    <button disabled = { reported }>REPORT</button>               
                               
                
                </form>    
                                
                
            </>
}


export default Report;