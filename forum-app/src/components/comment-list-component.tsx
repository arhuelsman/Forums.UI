import React, { createContext, useContext, useState } from 'react';
import { UserPost } from '../models/post-model';
import { Comment } from './comment-component';
import { useGetCommentsQuery } from '../hooks/useGetCommentsQuery';
import {isMobile} from 'react-device-detect';

export function CommentList({post}: {post: UserPost}) {
    const { data: comments, isSuccess, isError, isLoading } = useGetCommentsQuery({postId: post.id});

    if (isSuccess) {
        return (
            <div className={isMobile ? 'scroll-py-y h-2/5 overflow-y-auto' 
                                     : 'scroll-py-y h-1/2 overflow-y-auto'}>
                {comments.map((comment) => (
                    <Comment key={""+comment.id} comment={comment}/>
                ))}
            </div>
        )
    }

    if (isError) {
        return <div className="text-red-500">Failed to fetch comments.</div>;
      }
    
      if (isLoading) {
        return (
          <div className="flex flex-col mt-12 text-center">
            Loading comments...
          </div>
        );
      }
    
    return <div>Hello!</div>;
}