import React, { useState } from 'react';
import { ClearAuthentication } from '../../hooks/useAuthentication';
import { EditUserInfo } from './edit-user-info-component';
import { User } from '../../models/user-model';
import { useGetUserQuery } from '../../hooks/useGetUserQuery';
import { PostRegisterApi } from '../../apis/postRegisterApi';
import { DeleteDeleteAccountApi } from '../../apis/deleteDeleteAccountApi';

export function UserOptions({userName, refresh, setRefresh} : {userName: string, refresh: boolean, setRefresh: (refresh:boolean) => void}) {
    const { data: user } = useGetUserQuery({username: userName});
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [isEditError, setIsEditError] = useState(false);

    function processChoice(option: string) {
        switch (option) {
            case 'edit':
                console.log(user);
                setIsEditingInfo(true);
                break;
            case 'delete':
                ClearAuthentication();
                deleteUser();
                setRefresh(!refresh);
                break;
            case 'logout':
                ClearAuthentication();
                setRefresh(!refresh);
                break;
            default:
                break;
        }
    }

    function deleteUser() {
        DeleteDeleteAccountApi.deleteAccount(userName)
            .then(() => {

            }).catch(() => {

            });
    }

    function updateInfo(user: User | null){
        if (user)
        {
            PostRegisterApi.postRegister({user:user, password:user.password})
                .then((value) => {
                    setIsEditingInfo(false);
                }).catch((e) => {
                    console.log(e);
                    setIsEditError(true);
                });
        }
    }

    return (
        <React.Fragment>
            <select
                className='text-blue-400 underline hover:cursor-pointer text-left bg-transparent'
                value={'none'}
                onChange={(e) => processChoice(e.target.value)}>
                    <option hidden value='none'>{userName}</option>
                    <option value='edit' className='bg-slate-900'>Edit Information</option>
                    <option value='delete' className='bg-slate-900'>Delete Account</option>
                    <option value='logout' className='bg-slate-900'>Logout</option>
            </select>
            {isEditingInfo && (
                <EditUserInfo
                    prepopUser={user!}
                    isRegistering={false}
                    errorMessage = {isEditError ? "There was a problem updating your info. Please try again later." : null}
                    setActive={setIsEditingInfo}
                    submitAction={updateInfo}
                ></EditUserInfo>
            )}
        </React.Fragment>
    );
}