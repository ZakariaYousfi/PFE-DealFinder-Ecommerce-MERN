import axios from '../axios'


const authProvider = {
    login: async ({ username, password }) =>  {
        return axios.post('/api/admin/authenticate',{ body: JSON.stringify({ username, password }), 
        withCredentials: true, credentials: 'include',
        headers: new Headers({ 'Content-Type': 'application/json' }),})
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            })
            .then(auth => {
                console.log("auth :"+auth)
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem('auth')
        ? Promise.resolve()
        : Promise.reject({ message: 'login required' }),
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            const { id, fullName, avatar } = JSON.parse(localStorage.getItem('auth'));
            return Promise.resolve({ id, fullName, avatar });
        } catch (error) {
            return Promise.reject(error);
        }
    },
     getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    },
    
    // ...
};

export default authProvider;