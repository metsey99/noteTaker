import React, { useState } from "react";
import styled from "styled-components";
import { Col, Row, message } from "antd";
import EditingModal from "./EditingModal";
import { DeleteOutlined } from "@ant-design/icons";
import { db } from "../firebase";

interface IDoc {
  id: any;
  title: string;
  content: string;
  color: string;
}

interface NoteBlockProps {
  notes: Array<IDoc>;
  changeNoteList: Function;
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
  const {
    notes,
    changeNoteList,
    noteTitle,
    noteContent,
    noteColor,
    userUid,
    noteUid,
  } = props;
  const [isVisible, setIsVisible] = useState(false);

  const handleEdit = () => {
    setIsVisible((prevState) => !prevState);
  };

  const deleteNote = (noteUid: string) => {
    let temp = [...notes];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === noteUid) {
        temp.splice(i, 1);
        break;
      }
    }
    changeNoteList(temp);
  };

  const handleDelete = async () => {
    await db
      .collection("Users")
      .doc(userUid)
      .collection("Notes")
      .doc(noteUid)
      .delete();
    deleteNote(noteUid);
    message.success("Successfully Deleted!");
  };

  return (
    <Row justify="center">
      <BlockStyle
        span={16}
        style={{
          backgroundColor: noteColor ? noteColor : "white",
        }}
      >
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col
            onClick={handleEdit}
            style={{
              width: "80%",
            }}
          >
            <TitleStyle>{noteTitle}</TitleStyle>
            <ContentStyle>{noteContent}</ContentStyle>
          </Col>
          <Col onClick={handleDelete}>
            <DeleteOutlined style={{ fontSize: "30px", color: "black" }} />
          </Col>
        </Row>
        {/* <Row onClick={handleEdit}></Row> */}
      </BlockStyle>
      <EditingModal
        notes={notes}
        changeNoteList={changeNoteList}
        noteUid={noteUid}
        uid={userUid}
        isNew={false}
        noteTitle={noteTitle}
        noteContent={noteContent}
        noteColor={noteColor}
        visible={isVisible}
        setVisible={handleEdit}
      />
    </Row>
  );
};

export default NoteBlock;
