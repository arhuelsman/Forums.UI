import React from 'react';
import { UserComment } from '../models/comment-model';
import likeIcon from '../img/like.png';
import dislikeIcon from '../img/dislike.png';

export function Comment({comment}: {comment: UserComment}) {
    return (
        <div className='m-4'>
        <label className='text-slate-500'>By...{comment.createdUser}</label>
            <div className='bg-slate-900 rounded-lg'>
                <label className='pl-4 text-slate-400 whitespace-pre-wrap'>{comment.text}</label>
            </div>
            <div className='ml-4 mt-1 grid grid-cols-2 min-w-screen'>
                <div className='grid grid-cols-3 justify-self-start'>
                    <img className='w-4 justify-self-start' src={likeIcon} alt="Like"/>
                    <img className='ml-2 w-4 justify-self-start' src={dislikeIcon} alt="Dislike"/>
                    <label className='text-sky-500 align-self-center'>{comment.likes - comment.dislikes}</label>
                </div>
            </div>
        </div>
    )
}