import { useState } from 'react';
import { useSelector } from 'react-redux';
import Deal from './Deal';
import Service from './Service';


const Post = ({ handleClose }) => {

    const [dealModal, setDealModal] = useState(true);
    const [serviceModal, setServiceModal] = useState(false);
    const error = useSelector((state) => state.errorReducer.postError);

    const handlePostModals = (e) => {
        if (e.target.id === "deal") {
            setDealModal(true);
            setServiceModal(false);
        } else if (e.target.id === "service") {
            setDealModal(false);
            setServiceModal(true);
        }
    }


    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>x</span>

                <ul className='post-list'>
                    <li onClick={handlePostModals} id="deal" className={dealModal ? "deal" : "no-deal"}>Deal</li>
                    <li onClick={handlePostModals} id="service" className={serviceModal ? "service" : "no-service"}>Service</li>
                </ul>

                {dealModal && <Deal error={error} handleClose={handleClose} />}
                {serviceModal && <Service error={error} handleClose={handleClose} />}

            </div>
        </div>
    );
};

export default Post;