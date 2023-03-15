import React from 'react';
import { styled } from '@linaria/react';

interface ContainerProps {
  variant?: 'center' | 'space-between';
  jystify?: 'center' | 'space-between';
  main?: boolean;
}
const ContainerStyled = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
`;

const Container: React.FC<ContainerProps> = ({
  children, variant, main, jystify,
}) => (
  <ContainerStyled variant={variant} jystify={jystify} main={main}>
    {children}
  </ContainerStyled>
);

export default Container;
