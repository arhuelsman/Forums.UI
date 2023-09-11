import React from 'react';
import { NewPostButton } from './new-post-component';
import { UserLogin } from './user/user-login-component';
import { GetAuthentication } from '../hooks/useAuthentication';

export function Banner() {
    const isLoggedIn = GetAuthentication();
    
    return (
        <div className='grid grid-cols-2 h-32 min-h-full min-w-full bg-slate-600 sticky'>
            <label className='justify-self-start self-center ml-20 text-6xl font-bold'>the forum</label>
            <div className='justify-self-end self-center'>
                <div className='grid grid-cols-1'>
                    <UserLogin/>
                    {isLoggedIn && <NewPostButton/>}
                </div>
            </div>
        </div>
    );
}