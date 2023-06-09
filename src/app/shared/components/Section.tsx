import React, { useState } from 'react';
import { styled } from '@linaria/react';

import Title from './Title';
import Angle from './Angle';

interface SectionProps {
  title?: string;
  subtitle?: string;
  collapse?: boolean;
  variant?: 'regular' | 'gray' | 'card' | 'exchange' | 'table';
  showAllAction?: () => void;
  defaultCollapseState?: boolean;
  isFarming?: boolean
}

const SectionStyled = styled.div<SectionProps>`
  position: relative;
  margin: 0;
  padding: 20px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.05);
  max-width: ${({ isFarming }) => (isFarming ? '914px' : '452px')};
  width: 100%;
  height: 100%;
  border-radius: 10px;
  @media (max-width: 913px){
    margin-bottom: 10px;
  }
  > .cancel-button {
    position: absolute;
    top: 68px;
    right: 20px;
    cursor: pointer;
  }

  > .send-input {
    width: 95%;
  }
`;

const SectionGrayStyled = styled.div`
  position: relative;
  margin: 0 -30px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  text-align: left;

  > .full-address-button {
    position: absolute;
    top: 68px;
    cursor: pointer;
    background: #202124;
    margin: 0;
    right: 20px;
  }

  > .cancel-button {
    position: absolute;
    top: 73px;
    right: 47px;
    cursor: pointer;
  }
  > .send-input {
    width: 88%;
  }
`;

const SectionCardStyled = styled(SectionStyled)`
  width: 430px;
  height: 301px;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionExchangeStyled = styled(SectionStyled)`
  display: flex;
  justify-content: center;
  height: 54px;
  align-items: center;
`;

const ButtonStyled = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  text-decoration: none;
  color: white;
  white-space: nowrap;
`;

const ShowAll = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #00f6d2;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const SectionTableStyled = styled(SectionStyled)`
  max-height: 200px;
  height: 100%;
  overflow: auto;
`;

const Section: React.FC<SectionProps> = ({
  title,
  collapse = false,
  variant = 'regular',
  subtitle,
  children,
  showAllAction,
  defaultCollapseState,
  isFarming,
}) => {
  const [hidden, setHidden] = useState(defaultCollapseState ?? collapse);

  const handleMouseDown: React.MouseEventHandler = () => {
    setHidden(!hidden);
  };

  const SectionComponent = {
    regular: SectionStyled,
    gray: SectionGrayStyled,
    card: SectionCardStyled,
    exchange: SectionExchangeStyled,
    table: SectionTableStyled,
  }[variant];

  return (
    <SectionComponent isFarming={isFarming}>
      {collapse && (
        <ButtonStyled type="button" onMouseDown={handleMouseDown}>
          <Angle value={hidden ? 180 : 0} margin={hidden ? 3 : 3} />
        </ButtonStyled>
      )}
      {!!title && (
        <TitleWrapper>
          <Title>{title}</Title>
          {showAllAction && <ShowAll onClick={showAllAction}>Show All</ShowAll>}
        </TitleWrapper>
      )}
      {!!subtitle && <Title variant="subtitle">{subtitle}</Title>}
      {!hidden && children}
    </SectionComponent>
  );
};

export default Section;
