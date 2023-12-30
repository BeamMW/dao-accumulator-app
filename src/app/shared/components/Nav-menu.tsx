import React, { useState } from 'react';
import { styled } from '@linaria/react';

interface NavMenuProps {
  onClick: () => void
  active: number
}

const Wrapper = styled.ul`
  //position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const SortItem = styled.li`
  list-style: none;
`;
const SortItemLink = styled.button<{ active: boolean }>`
  background: transparent;
  border: none;
  float: left;
  display: block;
  color: ${({ active }) => (active ? 'white' : 'rgba(255,255,255, 0.3)')};
  font-family: 'SFProDisplay', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  padding: 4px 16px;
  cursor: pointer;
  text-transform: uppercase;
  border-bottom: ${({ active }) => (active ? '2px solid var(--color-green)' : 'transparent')};
  //TODO: BOX_SHADOW
  &:hover {
    border-bottom: 2px solid var(--color-green);
  }
  &:disabled {
    border-bottom: none;
    color: rgba(255, 255, 255, 0.1);
  }
`;

const NavMenu = ({ onClick, active }: NavMenuProps) => {
  const menu = [
    { name: 'BEAMX', value: 1 },
    { name: 'Nephrite', value: 2 },
  ];

  return (
    <Wrapper>
      {menu.map((el) => (
        <SortItem key={el.value}>
          <SortItemLink
            key={el.value}
            active={active === el.value}
            onClick={() => onClick()}
          >
            {el.name}
          </SortItemLink>
        </SortItem>
      ))}
    </Wrapper>
  );
};
export default NavMenu;
