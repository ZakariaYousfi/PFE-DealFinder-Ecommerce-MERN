import { dateParser } from '../Utils';

const UserProfileInfo = ({ user }) => {

    return (
        <div className="profil-container">
            <h1>{user.username}'s Profile</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Profile Picture</h3>
                    <img src={user.picture} alt="user-pic" />
                    <br />
                    <button style={{ color: "#f23629" }}>Report User</button>
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>About The User</h3>
                        <p>{user.bio}</p>
                    </div>
                    <h4>Joined In : {dateParser(user.createdAt)}</h4>
                </div>
            </div>
        </div>
    );
}

export default UserProfileInfo