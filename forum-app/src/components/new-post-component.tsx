import React, { useState }  from 'react';
import { PostModal } from './new-post-modal';

export function NewPostButton() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            <button className='bg-slate-200  w-fit mr-20 p-1 pl-2 pr-2 rounded border-2 border-slate-300' onClick={() => setIsActive(!isActive)}>New Post</button>
            <PostModal isActive={isActive} setActive={setIsActive}/>
        </div>
    );
}