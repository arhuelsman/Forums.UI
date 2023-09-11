import React, { useState } from 'react';
import { UserPost } from '../models/post-model';
import likeIcon from '../img/like.png';
import dislikeIcon from '../img/dislike.png';
import commentsIcon from '../img/comments.png';
import {isMobile} from 'react-device-detect';
import { PostModal } from './post-modal';
import { PostContent } from './post-content-component';
import { PostVotesAndComments } from './post-votes-comments-component';

export function Post({post}: {post:UserPost}) {
    const [isActive, setIsActive] = useState(false);
    
    return (
        <React.Fragment>
            <div className={isMobile ? 
                'm-4 w-4/5 bg-slate-800 rounded-xl border-8 border-slate-800 h-fit max-h-fit flex-initial' : 
                'm-4 w-2/5 bg-slate-800 hover:bg-slate-700 rounded-xl border-8 border-slate-800 hover:border-slate-700 h-fit max-h-fit flex-initial'}
                onClick={() => setIsActive(!isActive)}>
                <PostContent post={post}/>
                <PostVotesAndComments post={post} isPostMode={true}/>
            </div>
            <PostModal post={post} isActive={isActive} setActive={setIsActive}/>
        </React.Fragment>
    );
}