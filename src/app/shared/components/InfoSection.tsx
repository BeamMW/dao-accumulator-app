import React, { useMemo, useState } from 'react';
import { Section } from '@app/shared/components/index';
import {
  fromGroths, getLockPeriod, getTime, getTVL, truncate,
} from '@core/appUtils';
import { styled } from '@linaria/react';
import { IUserView } from '@app/shared/interface';
import { BALANCE_TITLE } from '@app/shared/constants';
import { useSelector } from 'react-redux';
import { selectSystemState } from '@app/shared/store/selectors';

interface PoolStatType {
  data: IUserView[];
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

const InfoSection = ({ data }:PoolStatType) => {
  const { current_height } = useSelector(selectSystemState());
  const [TVL, setTVL] = useState('0 BEAM / 0 BEAMX');
  const [currentHeight, setCurrentHeight] = useState(0);
  const [unclockDays, setUnlockDays] = useState('-');
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
    } else setUnlockDays('...calculating');
  }, [currentHeight]);
  return (
    <Section title="Balance">
      <AmountWrapper>
        <SideLeftWrap>
          {
            BALANCE_TITLE.map((el) => <InfoTitle>{el.title}</InfoTitle>)
          }
        </SideLeftWrap>
        <SideRightWrap>
          <InfoText>{truncate(fromGroths(data['lpToken-pre']).toString(), 7)}</InfoText>
          <InfoText>{TVL}</InfoText>
          <InfoText>{truncate(fromGroths(data['avail-BeamX']).toString(), 7)}</InfoText>
          <InfoText>{getLockPeriod(data['lock-periods'])}</InfoText>
          <InfoText>{unclockDays}</InfoText>
        </SideRightWrap>
      </AmountWrapper>
    </Section>
  );
};

export default InfoSection;
