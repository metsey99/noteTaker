import React, {useState} from 'react';
import {Affix, Row} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import EditingModal from './EditingModal';

const AffixStyle = styled(Affix)`
  position: fixed;
  bottom: 12px;
  right: 7px;
`;

const ButtonStyle = styled.div`
  border-radius: 21px;
  color: #0080ff;
  :hover{
    *{
      border-radius: 22px;
      color: #0066cc;
      box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.5);
    }
  }
`;

interface AddNoteButtonProps {
  userUid: string;
}

const AddNoteButton = ({userUid}: AddNoteButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const handleAdd = () => {
    setIsVisible(prevState => !prevState);
  }

  return (
    <Row>
        <AffixStyle>
          <ButtonStyle onClick={handleAdd}>
            <PlusCircleOutlined style={{fontSize: "40px"}}/>
          </ButtonStyle>
        </AffixStyle>
        <EditingModal visible={isVisible} setVisible={handleAdd} uid={userUid} isNew={true}/>
    </Row>
  );
}

export default AddNoteButton;