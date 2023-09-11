import React, { useState } from 'react';
import { UserPost } from '../models/post-model';
import likeIcon from '../img/like.png';
import dislikeIcon from '../img/dislike.png';
import commentsIcon from '../img/comments.png';
import { CommentModal } from './new-comment-modal';
import { GetAuthentication } from '../hooks/useAuthentication';

export function PostVotesAndComments({post, isPostMode} : {post: UserPost, isPostMode: boolean}) {
    const [isNewCommentActive, setNewCommentActive] = useState(false);
    const isLoggedIn = GetAuthentication();

    return (
        <div className='m-4 grid grid-cols-2 min-w-screen'>
            <div className='grid grid-cols-3 justify-self-start'>
                <img className='w-8 justify-self-start' src={likeIcon} alt="Like"/>
                <img className='w-8 justify-self-start' src={dislikeIcon} alt="Dislike"/>
                <label className='text-sky-500 align-self-center'>{post.likes - post.dislikes}</label>
            </div>
            {isPostMode && <div className='grid grid-cols-2 justify-self-end'>
                <label className='text-slate-400 align-self-center'>{post.comments}</label>
                <img className='w-8 justify-self-end' src={commentsIcon} alt="Comments"/>
            </div>}
            {!isPostMode && isLoggedIn && 
            <React.Fragment>
                <div className='justify-self-end'>
                    <button className='bg-slate-200 w-fit pl-2 pr-2 rounded border-2 border-slate-300' onClick={() => setNewCommentActive(!isNewCommentActive)}>Comment</button>
                </div>
                <CommentModal postId={post.id} isActive={isNewCommentActive} setActive={setNewCommentActive}/>
            </React.Fragment>
            }
        </div>
    )
}