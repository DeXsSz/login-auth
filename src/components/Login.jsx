import React, { useCallback, useState } from 'react';
import { db, auth } from '../firebase';
import { withRouter } from 'react-router-dom';
const Login = props => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);
    const [isRegistro, setIsRegistro] = useState(true);
    const procesarDatos = e => {
        e.preventDefault();
        if (!email.trim()) {
            // console.log('Datos Invalidos');
            setError('Ingrese un email');
            return;
        }
        if (!pass.trim()) {
            // console.log('Datos vacíos pass!')
            setError('Ingrese una password');
            return;
        }
        if (pass.length < 6) {
            // console.log('La Password tiene que ser mayor a 6 caracteres');
            setError('La Password tiene que ser mayor o igual a 6 caracteres');
            return;
        }
        setError(null);
        if (isRegistro) {
            registrar();
        } else {
            login();
        }
    };
    const login = useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass);
            const { user } = await res;
            console.log('logeado! ', user.email);
            setEmail('');
            setPass('');
            setError(null);
            props.history.push('/admin');
        } catch (error) {
            const code = error.code;
            if (code === 'auth/invalid-email') {
                setError('La dirección de correo electrónico es invalida.');
            }
            if (code === 'auth/user-not-found') {
                setError(
                    'No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.'
                );
            }
            if (code === 'auth/wrong-password') {
                setError('La contraseña no es válida o el usuario no tiene contraseña.');
            }
        }
    }, [email, pass, props.history]);
    const registrar = useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass);
            const { user } = await res;
            await db.collection('usuarios').doc(user.email).set({
                email: user.email,
                uid: user.uid,
            });
            console.log('resgistrado! ', user.email);
            setEmail('');
            setPass('');
            setError(null);
            props.history.push('/admin');
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                setError('La dirección de correo electrónico es invalida.');
            }
            if (error.code === 'auth/email-already-in-use') {
                setError(
                    'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.'
                );
            }
        }
    }, [email, pass, props.history]);
    return (
        <div className="mt-5">
            <h3 className="text-center">
                {isRegistro ? 'Registro de usuario' : 'Login de acceso'}
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese E-Mail"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese Password"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        {error ? <div className="alert alert-danger">{error}</div> : null}
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                            {isRegistro ? 'Registrarse' : 'Inicia sesion'}
                        </button>
                        <button
                            className="btn btn-info btn-sm btn-block"
                            onClick={() => setIsRegistro(!isRegistro)}
                            type="button">
                            {isRegistro
                                ? '¿Ya tienes Cuenta?'
                                : '¿No tienes cuenta? Crea una aqui!'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
