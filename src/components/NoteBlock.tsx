import React, {useState} from 'react';
import styled from 'styled-components';
import { Col, Row, message } from 'antd';
import EditingModal from './EditingModal';
import {DeleteOutlined } from '@ant-design/icons';
import {db} from '../firebase';

interface NoteBlockProps {
  noteUid: string;
  userUid: string;
  noteTitle: string;
  noteContent: string;
  noteColor?: string;
}

const BlockStyle = styled(Col)`
  border-radius: 12px;
  padding: 15px;
  text-align: left;
  white-space: pre-line;
`;

const TitleStyle = styled(Row)`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentStyle = styled(Row)`
  font-size: 17px;
`;

const NoteBlock = (props: NoteBlockProps) => {
  const {noteTitle, noteContent, noteColor, userUid, noteUid} = props;
  const [isVisible, setIsVisible] = useState(false);
  
  const handleEdit = () => {
    setIsVisible(prevState => !prevState);
  }
  
  const handleDelete = async () => {
    message.success("Successfully Deleted!")
    await db.collection("Users").doc(userUid).collection("Notes").doc(noteUid).delete();
    window.location.reload(true);
  }

  return (
    <Row justify="center">
      <BlockStyle span={16} style={{backgroundColor: noteColor?noteColor:"white", display: 'inline-block'}} >
        <Row align="middle" >
          <Col xs={{span: 20}} sm={{span: 21}} md={{span: 22}} span={23} onClick={handleEdit}>
            <TitleStyle>{noteTitle}</TitleStyle>
          </Col>
          <Col onClick={handleDelete}>
            <DeleteOutlined style={{fontSize: '24px'}}/>
          </Col>
        </Row>
        <Row onClick={handleEdit}>
          <ContentStyle>{noteContent}</ContentStyle>
        </Row>
      </BlockStyle>
      <EditingModal noteUid={noteUid} uid={userUid} isNew={false} noteTitle={noteTitle} noteContent={noteContent} noteColor={noteColor} visible={isVisible} setVisible={handleEdit}/>
    </Row>
  );
}

export default NoteBlock;