import React, { useMemo, useState } from 'react';
import { Button, Section } from '@app/shared/components/index';
import {
  fromGroths, getLockPeriod, getTime, getTVL, truncate,
} from '@core/appUtils';
import { styled } from '@linaria/react';
import { IUserView } from '@app/shared/interface';
import { BALANCE_TITLE } from '@app/shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectSystemState } from '@app/shared/store/selectors';
import { IconFavoriteFilled } from '@app/shared/icons';
import { actions } from '@app/containers/Main/store';

interface PoolStatType {
  data: IUserView[];
  isFarming?: boolean,
  predict?: number
}

const AmountWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: flex-start;
`;
const InfoTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 17px;
  color: white;
  text-transform: uppercase;
  
`;
const InfoText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: white;
  text-transform: uppercase;
`;
const SideLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
const SideRightWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const InfoSection = ({ data, isFarming = false }:PoolStatType) => {
  const { current_height } = useSelector(selectSystemState());
  const [TVL, setTVL] = useState('0 BEAM / 0 BEAMX');
  const [currentHeight, setCurrentHeight] = useState(0);
  const [unclockDays, setUnlockDays] = useState('...calculating');

  const dispatch = useDispatch();
  useMemo(() => {
    if (current_height) {
      setCurrentHeight(current_height);
    }
  }, [current_height]);
  useMemo(() => {
    setTVL(getTVL(data['lpToken-pre']));
  }, [data['lpToken-pre']]);
  useMemo(() => {
    if (currentHeight > 0) {
      setUnlockDays(
        getTime(data['unlock-height'], currentHeight),
      );
    } else setUnlockDays('-');
  }, [currentHeight]);
  const availbleBeamX = truncate(fromGroths(data['avail-BeamX'])
    .toString(), 10);
  const onWithdrawBeamX = (beamX:number) => {
    dispatch(actions.userUpdate.request({ amountBeamX: beamX, amountLpToken: 0, bLockOrUnlock: 1 }));
  };
  return (
    <Section title="Balance">
      <AmountWrapper>
        <SideLeftWrap>
          <InfoText>{BALANCE_TITLE.EARLY_LP}</InfoText>
          <InfoText>{isFarming ? BALANCE_TITLE.FARMING_BALANCE : BALANCE_TITLE.LOCK_BALANCE}</InfoText>
          <InfoText>{BALANCE_TITLE.FARMED}</InfoText>
          <InfoText>{BALANCE_TITLE.LOCK_PER}</InfoText>
          <InfoText>{BALANCE_TITLE.UNLOCK}</InfoText>
        </SideLeftWrap>
        <SideRightWrap>
          <InfoText>
            {truncate(fromGroths(data['lpToken-pre'])
              .toString(), 7)}
          </InfoText>
          <InfoText>{isFarming ? `${fromGroths(data['lpToken-pre'])} / ${fromGroths(data['lpToken-post'])}` : TVL}</InfoText>
          <InfoText style={{ display: 'flex', alignItems: 'center' }}>
            {isFarming ? (
              <Button
                variant="link"
                icon={IconFavoriteFilled}
                onClick={() => onWithdrawBeamX(data['avail-BeamX'])}
              >
                CLAIM
              </Button>
            ) : null}
            {availbleBeamX}
          </InfoText>
          <InfoText>{getLockPeriod(data['lock-periods'])}</InfoText>
          <InfoText>{unclockDays}</InfoText>
        </SideRightWrap>
      </AmountWrapper>
    </Section>
  );
};

export default InfoSection;
