import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';

const Admin = props => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (auth.currentUser) {
            console.log('existe el usuario');
            setUser(auth.currentUser);
        } else {
            console.log('no existe el usurario');
            props.history.push('login');
        }
    }, [props.history]);
    return (
        <div>
            <h2>Ruta Protejida</h2>
            {user && <h4>{user.email}</h4>}
        </div>
    );
};

export default withRouter(Admin);
