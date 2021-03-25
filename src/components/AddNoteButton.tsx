import React, { useState } from "react";
import { Affix, Row } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import EditingModal from "./EditingModal";

const AffixStyle = styled(Affix)`
  position: fixed;
  width: 100%;
  height: auto;
  bottom: 0px;
  background-color: white;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ButtonStyle = styled.div`
  border-radius: 21px;
  color: #0080ff;
  :hover {
    * {
      border-radius: 22px;
      color: #0066cc;
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
    }
  }
`;

interface IDoc {
  id: any;
  title: string;
  content: string;
  color: string;
}

interface AddNoteButtonProps {
  notes: Array<IDoc>;
  changeNotes: Function;
  userUid: string;
}

const AddNoteButton = ({ notes, changeNotes, userUid }: AddNoteButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleAdd = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <Row style={{ marginTop: "55px" }}>
      <AffixStyle>
        <ButtonStyle onClick={handleAdd}>
          <PlusCircleOutlined style={{ fontSize: "40px" }} />
        </ButtonStyle>
      </AffixStyle>
      <EditingModal
        notes={notes}
        changeNoteList={changeNotes}
        visible={isVisible}
        setVisible={handleAdd}
        uid={userUid}
        isNew={true}
      />
    </Row>
  );
};

export default AddNoteButton;
