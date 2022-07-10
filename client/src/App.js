import { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import Routes from './components/Routes';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/userActions';
import { getUsers } from './actions/usersActions';

// App is the main component
// App renders to show our application
const App = () => {
  // uid is the user id, it's set to null before logging in
  const [uid, setUid] = useState(null);
  // useDispatch is a methode used to fetch data form our data base
  const dispatch = useDispatch();

  // getting the data form the DB
  // useEffect is hook method that runs code on every render
  // as long as the user is logged in we will keep fetshing the data from the db
  useEffect(() => {
    const fetchToken = async () => {
      // axios allows querys form our UI to the DB
      await Axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      }).then(res => {
        setUid(res.data);
      })
        .catch(err => console.log("No Token"));
    }
    // calling the fetchToken method for async purposes
    fetchToken();

    // if the user is logged in the dispatch method is called and it calls by it self the getUser method
    // this method is called when the user is logged in 
    dispatch(getUsers());
    if (uid) dispatch(getUser(uid));


  }, [dispatch, uid]);

  return (
    <div className="App">
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>

    </div>
  );
}

export default App;
