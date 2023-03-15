import React from 'react';
import { styled } from '@linaria/react';

interface SectionProps {
  variant?: 'center' | 'space-between';
}
const SectionStyled = styled.div<SectionProps>`
  display: flex;
  justify-content: ${({ variant }) => variant || 'space-between'};
  width: 914px;
  position: relative;
`;
const AssetsContainer: React.FC<SectionProps> = ({ children, variant = 'space-between' }) => (
  <SectionStyled variant={variant}>{children}</SectionStyled>
);

export default AssetsContainer;
