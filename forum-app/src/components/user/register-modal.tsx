import React, { useState }  from 'react';
import { PostRegisterApi } from '../../apis/postRegisterApi';
import { User } from '../../models/user-model';
import { EditUserInfo } from './edit-user-info-component';

export function RegisterModal({isActive, setActive} : {isActive: boolean, setActive: (active:boolean) => void}) {
    const [isRegisterError, setIsRegisterError] = useState(false);

    function Register(user: User | null){
        if (user)
        {
            PostRegisterApi.postRegister({user:user, password:user.password})
                .then((value) => {
                    setActive(false);
                }).catch((e) => {
                    console.log(e);
                    setIsRegisterError(true);
                });
        }
    }

    return (
        <React.Fragment>
        {isActive && (
            <EditUserInfo
                prepopUser={{} as User}
                isRegistering={true}
                errorMessage = {isRegisterError ? "There was a problem registering. Please try again later." : null}
                setActive={setActive}
                submitAction={Register}
            ></EditUserInfo>
        )}
        </React.Fragment>
    );
}