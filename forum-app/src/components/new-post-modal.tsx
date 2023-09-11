import React, { useState }  from 'react';
import Modal from 'react-modal';
import { PostPostApi } from '../apis/postPostApi';
import {isMobile} from 'react-device-detect';
import { GetCurrentUser } from '../hooks/useAuthentication';
import { usePostPostMutation } from '../hooks/usePostPostMutation';

export function PostModal({isActive, setActive} : {isActive: boolean, setActive: (active:boolean) => void}) {
    const [title, setTitle] = useState("");
    const user = GetCurrentUser()!;
    const [description, setDescription] = useState("");
    const { mutate, isLoading, isError } = usePostPostMutation(
        {title: title, description: description, created_user: user},
        { onSuccess: () => {} },
      );

    function savePost() {
        mutate({title: title, description: description});
        setActive(false);
    }

    return (
        <React.Fragment>
        {isActive && (
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur flex">
                <div className={isMobile ? 'w-4/5 m-auto shadow-2xl bg-slate-700 border-4 border-slate-900 rounded-lg' : 'w-2/5 m-auto shadow-2xl bg-slate-700 border-4 border-slate-900 rounded-lg'}>
                    <div className='m-4 grid grid-cols-2'>
                        <label className='text-slate-200 text-2xl'>Let's create your post</label>
                        <button className='mr-4 justify-self-end text-xl font-bold' onClick={() => setActive(false)}>Cancel</button>
                    </div>
                    <div className='m-4 grid'>
                        <label className='ml-1 text-lg text-slate-300'>Title</label>
                        <textarea className='p-2 h-10 align-text-top break-words' value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                    </div>
                    <div className='m-4 grid'>
                        <label className='ml-1 text-lg text-slate-300'>Post</label>
                        <textarea className='p-2 h-60 align-text-top break-words' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className='grid'>
                        <button className='mb-8 justify-self-center bg-slate-200 w-fit p-1 pl-2 pr-2 rounded border-2 border-slate-300' onClick={() => savePost()}>Submit!</button>
                    </div>
                </div>
            </div>
        )}
      </React.Fragment>
    );
}