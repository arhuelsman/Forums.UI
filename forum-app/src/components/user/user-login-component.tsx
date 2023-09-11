import React, { useState } from 'react';
import { LoginModal } from './login-modal';
import { GetAuthentication, GetCurrentUser } from '../../hooks/useAuthentication';
import { UserOptions } from './user-options-component';

export function UserLogin() {
    const [isActive, setIsActive] = useState(false);
    const isLoggedIn = GetAuthentication();
    const userName = GetCurrentUser();
    const [refresh, setRefresh] = useState(true);

    return (
        <div className='mr-10'>
            {!isLoggedIn && (<label className='text-blue-400 underline hover:cursor-pointer text-right' onClick={() => setIsActive(!isActive)}>Login/Register</label>)}
            {isLoggedIn && (<UserOptions userName={userName!} refresh={refresh} setRefresh={setRefresh}/>)}
            <LoginModal isActive={isActive} setActive={setIsActive}/>
        </div>
    );
}