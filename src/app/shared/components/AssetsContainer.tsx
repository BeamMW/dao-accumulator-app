import React from 'react';
import { styled } from '@linaria/react';

interface SectionProps {
  variant?: 'center' | 'space-between';
}
const SectionStyled = styled.div<SectionProps>`
  display: flex;
  justify-content: ${({ variant }) => variant || 'space-between'};
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  @media (min-width: 914px){
    width: 914px;
  }
`;
const AssetsContainer: React.FC<SectionProps> = ({ children, variant = 'space-between' }) => (
  <SectionStyled variant={variant}>{children}</SectionStyled>
);

export default AssetsContainer;
