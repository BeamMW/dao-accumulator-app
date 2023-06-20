import React from 'react';
import { styled } from '@linaria/react';
import { IconLogo } from '@app/shared/icons';
import { Container, Window } from '@app/shared/components/index';

const Description = styled.div`
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  width: ${({ isSearchable }) => (isSearchable ? '256px' : '281px')} 256px;
  margin-top: ${({ isSearchable }) => (isSearchable ? '40px' : '54px')};
`;

const Loader = () => (
  <Window>
    <Container variant="center" jystify="center">
      <IconLogo />
      <Description>Please wait, Beam Liquidity Mining Dapp is loading...</Description>
    </Container>
  </Window>
);

export default Loader;
