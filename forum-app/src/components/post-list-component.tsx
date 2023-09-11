import React from 'react';
import { GetPostsApi } from '../apis/getPostsApi';
import { UserPost } from '../models/post-model';
import { Post } from './post-component';
import { useGetPostsQuery } from '../hooks/useGetPostsQuery';

export function PostList() {
    const { data: posts, isSuccess, isError, isLoading } = useGetPostsQuery({});

    if (isSuccess) {

        return (
            <div className='grid grid-cols-1 justify-items-center min-h-screen bg-slate-900'>
                {posts.map((post) => (
                    <Post key={""+post.id} post={post}/>
                ))}
            </div>
        )
    }

    if (isError) {
        return <div className="text-red-500">Failed to fetch posts.</div>;
      }
    
      if (isLoading) {
        return (
          <div className="flex flex-col mt-12 text-center">
            Loading posts...
          </div>
        );
      }
    
    return <div>Hello!</div>;
}