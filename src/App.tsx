import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import NoteBlock from './components/NoteBlock';
import styled from 'styled-components';
import LoginPage from './pages/login/LoginPage';
import AddNoteButton from './components/AddNoteButton';
import { auth, db } from './firebase';

interface IDoc {
  id: any;
  title: string;
  content: string;
  color: string;
}

const BlockStyle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const App = () => {
  const [userUid, setuserUid] = useState("");
  const [existingNotes, setExistingNotes] = useState<IDoc[]>([])

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user !== null) {
        setuserUid(user.uid ? user.uid : "");
        const userDocRef = db.collection("Users").doc(user.uid).collection("Notes");
        let res = await userDocRef.get();
        let tempArr: IDoc[] = [];
        res.forEach((doc) => {
          const { title, content, color } = doc.data();
          tempArr.push({ id: doc.id, title: title, content: content, color: color });
        });
        setExistingNotes(tempArr);
      }
    });
  }, []);

  return (
    <div className="App">
      <LoginPage />
      {
        existingNotes.length !== 0 ?
          existingNotes.map((note: IDoc) => {
            const { id, title, content, color } = note;
            return (
              <BlockStyle>
                <NoteBlock noteTitle={title} noteContent={content} noteColor={color} noteUid={id} userUid={userUid} />
              </BlockStyle>
            );
          }) :
          <div>
            <h1>No notes!</h1>
          </div>
      }
      {existingNotes && <AddNoteButton userUid={userUid} />}
      
    </div>
  );
}

export default App;
