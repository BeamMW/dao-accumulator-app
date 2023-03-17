import React from 'react';
import { IAsset, IPoolCard } from '@core/types';
import { Section } from '@app/shared/components/index';
import AssetLabel from '@app/shared/components/AssetLabel';
import { fromGroths, getLockPeriod, truncate } from '@core/appUtils';
import { styled } from '@linaria/react';
import { IUserView } from '@app/shared/interface';
import { BALANCE_TITLE } from '@app/shared/constants';

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
  return (
    <Section title="Balance">
      <AmountWrapper>
        <SideLeftWrap>
          {
            BALANCE_TITLE.map((el) => <InfoTitle>{el.title}</InfoTitle>)
          }
        </SideLeftWrap>
        <SideRightWrap>
          <InfoText>{fromGroths(data['avail-BeamX'])}</InfoText>
          <InfoText>{getLockPeriod(data['lock-periods'])}</InfoText>
          <InfoText>{fromGroths(data['lpToken-pre'])}</InfoText>
          <InfoText>{fromGroths(data['lpToken-post'])}</InfoText>
          <InfoText>{data['unlock-height']}</InfoText>
        </SideRightWrap>
      </AmountWrapper>
    </Section>
  );
};

export default InfoSection;
