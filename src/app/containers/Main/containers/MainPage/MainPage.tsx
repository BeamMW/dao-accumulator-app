import React, { useMemo, useState } from 'react';
import {
  Button, Section, Window, Input, Container, ReactSelect, InfoSection,
} from '@app/shared/components';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@app/containers/Main/store';
import AssetsSection from '@app/shared/components/AssetSection';
import AssetLabel from '@app/shared/components/AssetLabel';
import {
  BEAM_ASSET_ID, BEAMX_ASSET_ID, LOCK_PERIOD_SELECT, PLACEHOLDER, TITLE_SECTIONS,
} from '@app/shared/constants/common';
import AssetsContainer from '@app/shared/components/AssetsContainer';
import { useInput } from '@app/shared/hooks';
import { toGroths } from '@core/appUtils';
import { styled } from '@linaria/react';
import { IOptions, IUserView } from '@app/shared/interface';
import './index.scss';
import { selectCurrentBalance } from '@app/containers/Main/store/selectors';

const SectionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;
const MainPage: React.FC = () => {
  const getCurrentBalance = useSelector(selectCurrentBalance());
  const [currentBalance, setCurrentBalance] = useState<IUserView[]>(getCurrentBalance);
  const [currentLockPeriod, setCurrentLockPeriod] = useState<IOptions | null>(null);

  useMemo(() => {
    setCurrentBalance(getCurrentBalance);
  }, [getCurrentBalance]);

  const amountInputBeam = useInput({
    initialValue: 0,
    validations: { isEmpty: true },
  });
  const amountInputBeamX = useInput({
    initialValue: 0,
    validations: { isEmpty: true },
  });
  const dispatch = useDispatch();
  const handleChangeInputBeam = (e) => {
    const { value } = e.target;
    if (value > 0) {
      amountInputBeam.onChange(e);
      amountInputBeamX.onChangeBind(value / 2);
    } else {
      amountInputBeamX.onChangeBind('');
      amountInputBeam.onChangeBind('');
    }
  };
  const handleChangeInputBeamX = (e) => {
    const { value } = e.target;
    if (value > 0) {
      amountInputBeamX.onChange(e);
      amountInputBeam.onChangeBind(value * 2);
    } else {
      amountInputBeam.onChangeBind('');
      amountInputBeamX.onChangeBind('');
    }
  };
  const handleRequest = (amountBeamX, lockPeriods) => {
    dispatch(actions.addUserPrePhase.request({ amountBeamX: toGroths(amountBeamX), lockPeriods }));
    amountInputBeamX.onChangeBind(0);
    amountInputBeam.onChangeBind(0);
  };

  return (
    <>
      <Window>
        <Container>
          {/* <Title variant="subtitle">Select Pair</Title> */}
          <AssetsContainer>
            <Section title={TITLE_SECTIONS.LOCK_AMOUNT_BEAM}>
              <AssetsSection>
                <Input
                  variant="amount"
                  pallete="purple"
                  value={amountInputBeam.value}
                  placeholder="0"
                  onChange={(e) => handleChangeInputBeam(e)}
                />
                <AssetLabel title="Beam" assets_id={BEAM_ASSET_ID} />
              </AssetsSection>
            </Section>
            <Section title={TITLE_SECTIONS.LOCK_AMOUNT_BEAMX}>
              <AssetsSection>
                <Input
                  variant="amount"
                  pallete="purple"
                  value={amountInputBeamX.value}
                  placeholder="0"
                  onChange={(e) => handleChangeInputBeamX(e)}
                />
                <AssetLabel title="BeamX" assets_id={BEAMX_ASSET_ID} />
              </AssetsSection>
            </Section>
          </AssetsContainer>
          <AssetsContainer>
            <SectionWrapper>
              <Section title={TITLE_SECTIONS.LOCK_PERIOD}>
                <div className="fees-wrapper">
                  <ReactSelect
                    options={LOCK_PERIOD_SELECT}
                    onChange={(e) => setCurrentLockPeriod(e)}
                  // defaultValue={{ value: LOCK_PERIOD_MONTH.THREE, label: '3 month' }}
                    placeholder={PLACEHOLDER.SELECT_LOCK_MONTH}
                    customPrefix="custom-select"
                  />
                </div>
              </Section>
            </SectionWrapper>
            <InfoSection data={currentBalance} />
          </AssetsContainer>
          <Button
            onClick={() => handleRequest(amountInputBeamX.value, currentLockPeriod.value)}
            disabled={!amountInputBeamX.isValid || !amountInputBeamX.isValid || !currentLockPeriod}
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
