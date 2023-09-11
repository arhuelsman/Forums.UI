import React, { useState }  from 'react';
import {isMobile} from 'react-device-detect';
import { PostLoginApi } from '../../apis/postLoginApi';
import { SetAuthentication } from '../../hooks/useAuthentication';
import { RegisterModal } from './register-modal';

export function LoginModal({isActive, setActive} : {isActive: boolean, setActive: (active:boolean) => void}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const [isRegisterActive, setIsRegisterActive] = useState(false);

    function LogIn(){
        PostLoginApi.postLogin({username, password})
            .then((value) => {
                SetAuthentication(value);
                setActive(false);
            }).catch(() => {
                setIsError(true);
            });
    }

    return (
        <React.Fragment>
        {isActive && (
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur flex">
                <div className={isMobile ? 'w-4/5 m-auto shadow-2xl bg-slate-700 border-4 border-slate-900 rounded-lg' : 'w-2/5 m-auto shadow-2xl bg-slate-700 border-4 border-slate-900 rounded-lg'}>
                    <div className='m-4 grid grid-cols-2'>
                        <label className='text-slate-200 text-2xl'>Login</label>
                        <button className='mr-4 justify-self-end text-xl font-bold' onClick={() => setActive(false)}>Cancel</button>
                    </div>
                    <div className='m-4 flex'>
                        <label className='ml-1 text-lg text-slate-300'>Username</label>
                        <input type='text' className='ml-6 max-w-32 p-1 h-8 align-text-top break-words' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    </div>
                    <div className='m-4 flex'>
                        <label className='ml-1 text-lg text-slate-300'>Password</label>
                        <input type='password' className='ml-6 max-w-32 p-1 h-8 align-text-top break-words' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className='grid grid-cols-1'>
                        <button className='mb-8 justify-self-center bg-slate-200 w-fit p-1 pl-2 pr-2 rounded border-2 border-slate-300' onClick={() => LogIn()}>Login</button>
                        {isError && (<label className='mb-8 justify-self-center w-fit p-1 pl-2 pr-2 text-red-400'>Invalid username/password</label>)}
                    </div>
                    <div className='m-4 grid grid-cols-2'>
                        <label className='text-slate-200 text-2xl' onClick={() => setIsRegisterActive(!isRegisterActive)}>New user? Register here!</label>
                    </div>
                    
                </div>
            </div>
        )}
        <RegisterModal isActive={isRegisterActive} setActive={setIsRegisterActive}/>
      </React.Fragment>
    );
}