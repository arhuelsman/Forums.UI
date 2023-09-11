import React, { useContext, useState }  from 'react';
import Modal from 'react-modal';
import { PostCommentApi } from '../apis/postCommentApi';
import {isMobile} from 'react-device-detect';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserComment } from '../models/comment-model';
import { usePostCommentMutation } from '../hooks/usePostCommentMutation';
import { GetCurrentUser } from '../hooks/useAuthentication';

export function CommentModal({postId, isActive, setActive} : {postId: bigint, isActive: boolean, setActive: (active:boolean) => void}) {
    const [text, setText] = useState("");
    const userId = GetCurrentUser()!;
    const { mutate, isLoading, isError } = usePostCommentMutation(
        { postId: postId, text: text, created_user: userId },
        { onSuccess: () => {} },
      );

    const queryClient = useQueryClient();
    function saveComment() {
        mutate({postId: postId, text:text});
        setActive(false);
    }

    return (
        <React.Fragment>
        {isActive && (
            <div className='col-span-3'>
                <textarea className='min-w-full p-2 h-20 align-text-top break-words' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                <button className='bg-slate-200 w-fit mt-1 pl-2 pr-2 rounded border-2 border-slate-300' onClick={() => saveComment()}>Post Comment</button>
            </div>
        )}
      </React.Fragment>
    );
}