import React from 'react';
import {
  Button, Section, Window, Input, Container,
} from '@app/shared/components';
import { useDispatch } from 'react-redux';
import { actions } from '@app/containers/Main/store';
import AssetsSection from '@app/shared/components/AssetSection';
import AssetLabel from '@app/shared/components/AssetLabel';
import { BEAM_ASSET_ID, BEAMX_ASSET_ID, TITLE_SECTIONS } from '@app/shared/constants/common';
import AssetsContainer from '@app/shared/components/AssetsContainer';
import { useInput } from '@app/shared/hooks';
import { toGroths } from '@core/appUtils';

const MainPage: React.FC = () => {
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
          <Button
            onClick={() => handleRequest(amountInputBeamX.value, 0)}
            disabled={!amountInputBeamX.isValid && !amountInputBeamX.isValid}
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
