import React from 'react';
import { UserPost } from '../models/post-model';

export function PostContent({post}: {post:UserPost}) {    
    return (
        <div>
        <label className='text-slate-500'>By...{post.createdUser}</label>
            <div className='m-4 bg-slate-700 border-slate-700 border-8 rounded'>
                <label className='text-slate-200 text-2xl font-medium'>{post.title}</label>
            </div>
            <div className='m-4 bg-slate-700 border-slate-700 border-8 rounded text-base'>
                <label className='text-slate-200 whitespace-pre-wrap'>{post.description}</label>
            </div>
        </div>
    );
}