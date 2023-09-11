import React, { useState } from 'react';
import { User } from '../../models/user-model';
import { FormInput } from './form-input-component';
import { States } from './const-states'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {isMobile} from 'react-device-detect';
import { GetRandomUserApi } from '../../apis/getRandomUserApi';

export function EditUserInfo(
    {
        prepopUser,
        isRegistering,
        setActive, 
        errorMessage, 
        submitAction,
    } : {
        prepopUser: User,
        isRegistering: boolean,
        setActive: (active:boolean) => void,
        errorMessage: string | null,
        submitAction: (user:User | null) => void,
    }) {
    const [user, setUser] = useState<User>(prepopUser);
    const [email, setEmail] = useState(prepopUser.contacts?.find((c) => c.contactType === 'Email')?.value ?? '');
    const [homePhone, setHomePhone] = useState(prepopUser.contacts?.find((c) => c.contactType === 'HomePhone')?.value ?? '');
    const [cellPhone, setCellPhone] = useState(prepopUser.contacts?.find((c) => c.contactType === 'CellPhone')?.value ?? '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [internalError, setInternalError] = useState('');

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const usernameRegex = /.{1,32}/;
    const nameRegex = /.{1,64}/;
    const phoneRegex = /.{1,16}/;
    const addressRegex = /.{1,64}/;
    const zipRegex = /\d{5}/;
    const passwordRegex = /.{1,}/;

    function getRandomUser() {
        var result = GetRandomUserApi.getRandomUser()
            .then((u) => {
                var existingUserName = user.username;
                setUser(u);
                // don't replace the username when randomly editing an existing profile
                if (!isRegistering) {
                    setUser({...user, username: existingUserName})
                }
                setEmail(u.contacts.find((c) => c.contactType === 'Email')!.value);
                setHomePhone(u.contacts.find((c) => c.contactType === 'HomePhone')!.value);
                setCellPhone(u.contacts.find((c) => c.contactType === 'CellPhone')!.value);
                setPassword(u.password);
                setNewPassword(u.password);
            }).catch(() => {});
    }

    function buildUser() : User | null
    {
        if (user.location) {
            user.location.country = 'United States';
        }

        user.contacts = [
            {contactType: 'Email', value: email},
            {contactType: 'HomePhone', value: homePhone},
            {contactType: 'CellPhone', value: cellPhone},
        ];

        user.password = password;

        // begin validation of fields
        var validationMessage = '';
        
        if (isRegistering && (password != newPassword)) {
            validationMessage += 'Passwords do not match\n';
        }
        if (!emailRegex.test(user.contacts.find(x => x.contactType==='Email')?.value ?? '')) {
            validationMessage += 'Please enter a valid email\n';
        }
        if (!usernameRegex.test(user.username ?? '')) {
            validationMessage += 'Please enter a valid username\n';
        }
        if (!nameRegex.test(user.name?.firstName ?? '')) {
            validationMessage += 'Please enter a valid first name\n';
        }
        if (!nameRegex.test(user.name?.lastName ?? '')) {
            validationMessage += 'Please enter a valid last name\n';
        }
        if (!phoneRegex.test(user.contacts.find(x => x.contactType==='HomePhone')?.value ?? '')) {
            validationMessage += 'Please enter a valid home phone\n';
        }
        if (!phoneRegex.test(user.contacts.find(x => x.contactType==='CellPhone')?.value ?? '')) {
            validationMessage += 'Please enter a valid cell phone\n';
        }
        if (!passwordRegex.test(password)) {
            validationMessage += 'Please enter a valid password\n';
        }

        if (validationMessage) {
            setInternalError(validationMessage);
            return null;
        }

        // end validation of fields

        return user;
    }

    return (
        <React.Fragment>
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur flex">
                <div className={isMobile ? 'w-4/5 m-auto h-full shadow-2xl bg-slate-700 border-4 border-slate-900 rounded-lg scroll-py-1 overflow-y-auto' 
                                         : 'w-2/5 m-auto my-20 h-auto shadow-2xl bg-slate-700 border-4 border-slate-900 rounded-lg scroll-py-1 overflow-y-auto'}>
                    <div className='m-4 grid grid-cols-3'>
                        <label className='text-slate-200 text-2xl'>User information</label>
                        <button className='text-slate-200' onClick={() => getRandomUser()}>Populate with random info</button>
                        <button className='mr-4 justify-self-end text-xl font-bold' onClick={() => setActive(false)}>Cancel</button>
                    </div>
                    {isRegistering && (
                    <React.Fragment>
                        <FormInput
                            label='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='example@abc.com'
                            validationTitle='Email address is invalid'
                            pattern={emailRegex}
                        />
                        <FormInput
                            label='Username'
                            value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            placeholder='username'
                            validationTitle='Please enter a username that does not exceed 32 characters'
                            pattern={usernameRegex}
                        />
                    </React.Fragment>
                    )}
                    <FormInput
                        label='Title'
                        value={user.name?.title}
                        onChange={(e) => setUser({...user, name: {...user.name, title: e.target.value}})}
                        placeholder='Mrs'
                        validationTitle=''
                        pattern={/.*/}
                    />
                    <FormInput
                        label='First Name'
                        value={user.name?.firstName} 
                        onChange={(e) => setUser({...user, name: {...user.name, firstName: e.target.value}})}
                        placeholder='John'
                        validationTitle='Please enter a valid name'
                        pattern={nameRegex}
                    />
                    <FormInput
                        label='Last Name'
                        value={user.name?.lastName} 
                        onChange={(e) => setUser({...user, name: {...user.name, lastName: e.target.value}})}
                        placeholder='Smith'
                        validationTitle='Please enter a valid name'
                        pattern={nameRegex}
                    />
                    <div className='m-4 grid grid-cols-4'>
                        <label className='ml-1 text-lg text-slate-300'>Birth Date</label>
                        <DatePicker 
                            className='ml-6 col-span-2 p-1 h-8 align-text-top break-words' 
                            selected={new Date(user.birthDate?.toString() ?? new Date().toString()) ?? new Date()} 
                            onChange={(d) => setUser({...user, birthDate: d})}>
                        </DatePicker>
                    </div>
                    <FormInput
                        label='Home Phone'
                        value={homePhone}
                        onChange={(e) => setHomePhone(e.target.value)}
                        placeholder='1234567890'
                        validationTitle='Please enter a valid 10 digit phone number'
                        pattern={phoneRegex}
                    />
                    <FormInput
                        label='Cell Phone'
                        value={cellPhone} 
                        onChange={(e) => setCellPhone(e.target.value)}
                        placeholder='1234567890'
                        validationTitle='Please enter a valid 10 digit phone number'
                        pattern={phoneRegex}
                    />
                    <FormInput
                        label='Street'
                        value={user.location?.street} 
                        onChange={(e) => setUser({...user, location: {...user.location, street: e.target.value}})}
                        placeholder='123 Place St'
                        validationTitle='Please enter a street address'
                        pattern={addressRegex}
                    />
                    <FormInput
                        label='City'
                        value={user.location?.city} 
                        onChange={(e) => setUser({...user, location: {...user.location, city: e.target.value}})}
                        placeholder='Cityville'
                        validationTitle='Please enter a city'
                        pattern={addressRegex}
                    />
                    <FormInput
                        label='State'
                        value={user.location?.state} 
                        onChange={(e) => setUser({...user, location: {...user.location, state: e.target.value}})}
                        placeholder='Wisconsin'
                        validationTitle='Please enter a state'
                        pattern={addressRegex}
                    />
                    <FormInput
                        label='Country'
                        value={user.location?.country} 
                        onChange={(e) => setUser({...user, location: {...user.location, country: e.target.value}})}
                        placeholder='United States'
                        validationTitle='Please enter a country'
                        pattern={addressRegex}
                    />
                    <FormInput
                        label='Zip Code'
                        value={user.location?.postalCode} 
                        onChange={(e) => setUser({...user, location: {...user.location, postalCode: e.target.value}})}
                        placeholder='12345'
                        validationTitle='Please enter a valid zip code'
                        pattern={zipRegex}
                    />
                    <div className='m-4 grid grid-cols-4'>
                        <label className='ml-1 text-lg text-slate-300'>Password</label>
                        <input 
                            type='password' 
                            className='ml-6 col-span-2 p-1 h-8 align-text-top break-words' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='********'
                            pattern=".{1,}"
                        ></input>
                    </div>
                    <div className='m-4 grid grid-cols-4'>
                        <label className='ml-1 text-lg text-slate-300'>Confirm Password</label>
                        <input 
                            type='password' 
                            className='ml-6 col-span-2 p-1 h-8 align-text-top break-words' 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='********'
                            pattern=".{1,}"
                        ></input>
                    </div>
                    {errorMessage && (
                        <label className='mb-8 justify-self-center w-fit p-1 pl-2 pr-2 text-red-400 whitespace-pre-wrap'>{errorMessage}</label>
                    )}
                    {internalError && (
                        <div className='p-1 pl-2 pr-2'>
                            <label className='mb-8 justify-self-center w-fit h-auto text-red-400 whitespace-break-spaces'>{internalError}</label>
                        </div>
                    )}
                    <div className='grid grid-cols-1'>
                        <button className='mb-8 justify-self-center bg-slate-200 w-fit p-1 pl-2 pr-2 rounded border-2 border-slate-300' onClick={() => submitAction(buildUser())}>Submit!</button>
                    </div>
                </div>
            </div>
      </React.Fragment>
    );
}