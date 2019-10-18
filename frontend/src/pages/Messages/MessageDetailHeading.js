import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Root = styled.div`
  position: relative;
  background-color: ${p => p.theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid ${p => p.theme.colors.grey[300]};
  z-index: 1;
`;

const User = styled.div`
  margin: 0 ${p => p.theme.spacing.xxs};
  padding: ${p => p.theme.spacing.xxs} ${p => p.theme.spacing.xxs};
  border-radius: ${p => p.theme.radius.md};
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  padding-left: ${p => p.theme.spacing.xs};
`;

const UserFullName = styled.div`
  font-size: ${p => p.theme.font.size.sm};
  color: ${p => p.theme.colors.text.primary};
  font-weight: ${p => p.theme.font.weight.bold};
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 ${p => p.theme.spacing.sm};
  color: ${p => p.theme.colors.text.secondary};
  font-size: ${p => p.theme.font.size.xs};
`;

const To = styled.div`
  margin-top: 1px;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  margin-left: ${p => p.theme.spacing.xs};
  font-size: ${p => p.theme.font.size.xs};
  color: ${p => p.theme.colors.text.secondary};
  border: 0;
  flex: 1;
`;

const MessageDetailHeading = ({ match, chatUser }) => {
  const inputRef = useRef(null);

  const onRootClick = () => {
    inputRef.current.focus();
  };

  if (match.params.userId === 'new') {
    return (
      <Root onClick={onRootClick}>
        <InputContainer>
          <To>To:</To>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type the name of a person"
            autoFocus
          />
        </InputContainer>
      </Root>
    );
  }

  if (chatUser) {
    return (
      <Root>
        <User
          key={chatUser.username}
          activeClassName="selected"
          to={`/messages/${chatUser.username}`}
        >
          <Image src={chatUser.image} alt={chatUser.fullName} />
          <UserInfo>
            <UserFullName>{chatUser.fullName}</UserFullName>
          </UserInfo>
        </User>
      </Root>
    );
  }

  return null;
};

MessageDetailHeading.propTypes = {
  match: PropTypes.object.isRequired,
  chatUser: PropTypes.object,
};

export default MessageDetailHeading;