import React from 'react';
import { styled } from '@linaria/react';
import { Button, Window } from '@app/shared/components';
import { useDispatch } from 'react-redux';
import { actions } from '@app/containers/Main/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  color: white;
`;

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Window>
        <Container>
          <Button onClick={
              () => (dispatch(actions.addUserPrePhase.request({ amountBeamX: 100, lockPeriods: 0 })))
        }
          >
            {' '}
            Lock
          </Button>
        </Container>
      </Window>
    </>
  );
};

export default MainPage;
