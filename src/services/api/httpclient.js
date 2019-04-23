import {post} from '../api/index';
const resetPasswordPath = 'users/password-reset/';
const loginPath = 'users/sign_in/';
const signupPath = 'users/sign-up/';

export function resetPassword(data) {
    return new Promise((resolve,reject) =>
        post(resetPasswordPath, data, false).then((resp) => {
            resolve(resp);
        })
            .catch(err => {
                reject(err); // not provide internal server error
            })
    );
}

export function login(data) {
    return new Promise(resolve =>
        post(loginPath, data, false).then((resp) => {
            resolve(resp);
        })
            .catch(err => {
                resolve(err); // not provide internal server error
            })
    );
}

export function signup(data) {
    return new Promise(resolve =>
        post(signupPath, data, false).then((resp) => {
            resolve(resp);
        })
            .catch(err => {
                resolve(err); // not provide internal server error
            })
    );
}


