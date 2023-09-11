import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Post } from './components/post-component';
import { Banner } from './components/banner-component';
import { PostList } from './components/post-list-component';

function App() {
  return (
    <div>
      <div className='sticky top-0'>
        <Banner/>
      </div>
      <PostList/>
    </div>
  );
}

export default App;
