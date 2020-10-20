import React, {useState} from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import EditingModal from './EditingModal';

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
  
  return (
    <Row justify="center">
      <BlockStyle span={16} style={{backgroundColor: noteColor?noteColor:"white"}} onClick={handleEdit}>
        <TitleStyle>{noteTitle}</TitleStyle>
        <ContentStyle>{noteContent}</ContentStyle>
      </BlockStyle>
      <EditingModal noteUid={noteUid} uid={userUid} isNew={false} noteTitle={noteTitle} noteContent={noteContent} noteColor={noteColor} visible={isVisible} setVisible={handleEdit}/>
    </Row>
  );
}

export default NoteBlock;