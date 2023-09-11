import React, { createContext, useState } from 'react';
import { UserPost } from '../models/post-model';
import { Comment } from './comment-component';
import { PostContent } from './post-content-component';
import { isMobile } from 'react-device-detect';
import { PostVotesAndComments } from './post-votes-comments-component';
import { CommentList } from './comment-list-component';

export function PostModal({post, isActive, setActive} : {post: UserPost, isActive: boolean, setActive: (active:boolean) => void}) {
    const [isDirty, setIsDirty] = useState(false);

    return (
        <React.Fragment>
        {isActive && <div className="fixed top-0 left-0 w-full h-full backdrop-blur flex" onClick={(e) => {if (e.currentTarget === e.target) {setActive(false)}}}>
            <div className={isMobile ? 
                    'm-auto w-4/5 bg-slate-800 rounded-xl border-8 border-slate-800 h-4/5 max-h-full flex-initial' : 
                    'm-auto w-2/5 bg-slate-800 rounded-xl border-8 border-slate-800 h-4/5 max-h-full flex-initial'}>
                <PostContent post={post}/>
                <PostVotesAndComments post={post} isPostMode={false}/>
                <CommentList post={post}/>
            </div>
        </div>}
        </React.Fragment>
    );
}