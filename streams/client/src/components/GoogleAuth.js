import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = () => {
    const [auth, setAuth] = useState({});
    const { isSignedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onSignInClick = () => {
        auth.signIn();
    };
    const onSignOutClick = () => {
        auth.signOut();
    };

    useEffect(() => {
        const onAuthChange = (currentLoginState) => {
            if (currentLoginState){
                dispatch(signIn(auth.currentUser.get().getId()));
            } else {
                dispatch(signOut());
            }
        };

        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '403387613222-mig5b1j0lt7hdrc7pgcdiigt7tkkaai1.apps.googleusercontent.com',
                scope: 'email'
            })
            .then(() => {
                setAuth(window.gapi.auth2.getAuthInstance());
                if (auth.isSignedIn) onAuthChange(auth.isSignedIn.get());
                if (auth.isSignedIn) auth.isSignedIn.listen(onAuthChange);
            });
        });
    }, [auth.isSignedIn, auth.currentUser, dispatch]);

    const renderAuthButton = () => {
        if (isSignedIn === null) {
            return null;
        } else if (isSignedIn) {
            return(
                <button
                    className="ui red google button"
                    onClick={onSignOutClick}
                >
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return(
                <button
                    className="ui red google button"
                    onClick={onSignInClick}
                >
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;