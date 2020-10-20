import React, { useState } from 'react';
import { Modal, Input, Form, Button, Row } from 'antd';
import { lightGreen, lightRed, lightBlue, lightOrange, lightPurple } from '../colors';
import { v1 as uuidv1 } from 'uuid';
import { db } from '../firebase';


interface EditingModalProps {
  isNew: boolean;
  noteTitle?: string;
  noteContent?: string;
  noteColor?: string;
  visible: boolean;
  setVisible: () => void;
  uid: string;
  noteUid?: string;
}

const EditingModal = (props: EditingModalProps) => {
  const { TextArea } = Input;
  const { uid, noteUid, isNew, noteTitle, noteContent, noteColor, setVisible, ...otherProps } = props
  const [title, setTitle] = useState(noteTitle ? noteTitle : "");
  const [content, setContent] = useState(noteContent ? noteContent : "");
  const [selectedColor, setSelectedColor] = useState(noteColor ? noteColor : lightRed);

  const handleTitleChange = (e: any): void => {
    setTitle(e.target.value);
  }

  const handleContentChange = (e: any): void => {
    setContent(e.target.value);
  }

  const handleFinish = async (values: Object) => {
    if (isNew) {
      const newNoteUid = uuidv1();
      await db.collection('Users').doc(uid).collection("Notes").doc(newNoteUid).set({
        title: title,
        content: content,
        color: selectedColor,
      })
    } else {
      await db.collection('Users').doc(uid).collection("Notes").doc(noteUid).set({
        title: title,
        content: content,
        color: selectedColor,
      })
    }
    window.location.reload(true);
    setVisible();
  }

  return (
    <Modal
      {...otherProps}
      footer={null}
      closable={false}
      onCancel={setVisible}
      bodyStyle={{ backgroundColor: selectedColor }}
    >
      <Form
        onFinish={handleFinish}
      >
        <Form.Item
          name="title"
          initialValue={title}
        >
          <Input value={title} onChange={handleTitleChange} bordered={true} placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="content"
          initialValue={content}
        >
          <TextArea value={content} onChange={handleContentChange} bordered={true} rows={5} placeholder="Note Content" />
        </Form.Item>
        <Row style={{ marginBottom: '25px' }} justify="center">
          <div
            style={{ width: '35px', height: '35px', backgroundColor: lightRed, borderRadius: '17px', marginLeft: '7.5px', marginRight: '7.5px', border: selectedColor === lightRed ? '2px solid black' : '2px solid white' }}
            onClick={() => { setSelectedColor(lightRed) }}
          ></div>
          <div
            style={{ width: '35px', height: '35px', backgroundColor: lightBlue, borderRadius: '17px', marginLeft: '7.5px', marginRight: '7.5px', border: selectedColor === lightBlue ? '2px solid black' : '2px solid white' }}
            onClick={() => { setSelectedColor(lightBlue) }}
          ></div>
          <div
            style={{ width: '35px', height: '35px', backgroundColor: lightGreen, borderRadius: '17px', marginLeft: '7.5px', marginRight: '7.5px', border: selectedColor === lightGreen ? '2px solid black' : '2px solid white' }}
            onClick={() => { setSelectedColor(lightGreen) }}
          ></div>
          <div
            style={{ width: '35px', height: '35px', backgroundColor: lightOrange, borderRadius: '17px', marginLeft: '7.5px', marginRight: '7.5px', border: selectedColor === lightOrange ? '2px solid black' : '2px solid white' }}
            onClick={() => { setSelectedColor(lightOrange) }}
          ></div>
          <div
            style={{ width: '35px', height: '35px', backgroundColor: lightPurple, borderRadius: '17px', marginLeft: '7.5px', marginRight: '7.5px', border: selectedColor === lightPurple ? '2px solid black' : '2px solid white' }}
            onClick={() => { setSelectedColor(lightPurple) }}
          ></div>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" block={true}>Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditingModal;