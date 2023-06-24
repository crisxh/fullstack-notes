
import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import Note from './components/Note';

function App() {
  const [author, setAuthor] = useState('anonymous');
  const [note, setNote] = useState('no note');
  const [posts, setPosts] = useState(null);
  const saveNote = (e) => {
    setNote(e.target.value);
    console.log(note);
  }
  const saveAuthor = (e) => {
    setAuthor(e.target.value);
    console.log(author);
  }

  const sendNote = () => {
    Axios.post('postgres://uafgikza:V9t6hAGB2fctnl5T6Eqmu0vpHNlrWxoI@lucky.db.elephantsql.com/uafgikza/create', {
      Author: author,
      Note: note
    })
    console.log(`note starting with: ${note.slice(0, 20)}... sent`);


  }

  const showNotes = () => {
    Axios.get('postgres://uafgikza:V9t6hAGB2fctnl5T6Eqmu0vpHNlrWxoI@lucky.db.elephantsql.com/uafgikza/posts').then((response) => {
      console.log('got it: ', response.data);

      setPosts(response.data);

    })

  }

  const deleteNote = (id) => {
    console.log(id);
    Axios.delete(`postgres://uafgikza:V9t6hAGB2fctnl5T6Eqmu0vpHNlrWxoI@lucky.db.elephantsql.com/uafgikza/delete/${id}`);

  }

  const editNote = () => {
    console.log('edit');
  }
  // const postElems=posts.map((post)=>{
  //   return <p key={post.ID}>Author:{post.Author} Note: {post.Note}</p>


  // })

  return (


    <div className="App">
      <div class="textInputArea">
        <h1>Leave A Note</h1>
        <label for='author'>
          Author:
        </label>
        <input name='author' type='text' onChange={saveAuthor}></input>
        <label for='note'>Note:</label>
        <textarea name='note' cols="40" rows="2" onChange={saveNote} />
        <div class="mainButtons">
          <button className="mainBtn sendBtn" onClick={sendNote}>Send Note > </button>
          <button className="mainBtn showBtn" onClick={showNotes}>Show Notes ⭐</button>
        </div>
      </div>


      {posts &&
        <div className='postsContainer'>{posts.map((post) => {
          return <Note Author={post.Author} Note={post.Note} edit={editNote} delete={deleteNote} ID={post.ID} />
        })} </div>
      }
    </div>
  );
}

export default App;

//