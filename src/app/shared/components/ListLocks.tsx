import React, { useMemo, useState } from 'react';
import { Button, Section } from '@app/shared/components/index';
import {
  fromGroths, getLockPeriod, getTime, getTVL, truncate,
} from '@core/appUtils';
import { styled } from '@linaria/react';
import { IUserView } from '@app/shared/interface';
import { useDispatch, useSelector } from 'react-redux';
import { selectSystemState } from '@app/shared/store/selectors';
import { ArrowUpIcon, IconFavoriteFilled } from '@app/shared/icons';
import { actions } from '@app/containers/Main/store';
import { IUserUpdate } from '@app/shared/interface/Request';

interface ListPeriodsStateType {
  data: IUserView[];
  isFarming?: boolean,
  TH: string[];
}

const Table = styled.table`
  width: 100%;
  justify-content: center;
`;
const Tr = styled.tr`
  text-align: center;
  
`;

const TD = styled.td`
    margin: 0 5px;
`;

const Wrapper = styled.div`
  max-height: 150px;
  overflow: auto;
  max-width: ${({ isFarming }) => (isFarming ? '914px' : '450px')};
  width: 100%;
  white-space: nowrap;
  &::-webkit-scrollbar {
    width: 2px;
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border-radius: 3px !important;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border-radius: 3px !important;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-green) !important;
    border-radius: 3px !important;
  }
`;

const ListLocks = ({ data, isFarming, TH }:ListPeriodsStateType) => {
  const { current_height } = useSelector(selectSystemState());
  const [currentHeight, setCurrentHeight] = useState(0);

  const dispatch = useDispatch();

  useMemo(() => {
    if (current_height) {
      setCurrentHeight(current_height);
    }
  }, [current_height]);

  const getWithdrawBeamX = (withData: IUserUpdate) => {
    dispatch(actions.userUpdate.request(withData));
  };
  const getClaimLpToken = (withData: IUserUpdate) => {
    dispatch(actions.userUpdate.request(withData));
  };

  return (
    <Section title="Balance" isFarming={isFarming}>
      <Wrapper isFarming={isFarming}>
        <Table>
          <Tr>
            {
              TH.map((val) => (
                <th>{val}</th>
              ))
            }
          </Tr>
          {
            data.map((value, index) => (
              <Tr key={index} isFarming={isFarming}>
                {isFarming ? <TD>{fromGroths(value['avail-BeamX'])}</TD> : null}
                {isFarming ? (
                  <TD>
                    <Button
                      variant="link"
                      icon={IconFavoriteFilled}
                      onClick={() => getWithdrawBeamX(
                        {
                          withdrawBeamX: value['avail-BeamX'],
                          hEnd: value['unlock-height'],
                          withdrawLpToken: 0,
                        },
                      )}
                    >
                      CLAIM
                    </Button>
                  </TD>
                ) : null}
                <TD>
                  {truncate(fromGroths(value.lpToken)
                    .toString(), 7)}
                </TD>
                {isFarming ? (
                  <TD>
                    {' '}
                    <Button
                      variant="link"
                      icon={ArrowUpIcon}
                      pallete="purple"
                      onClick={() => getClaimLpToken(
                        {
                          withdrawBeamX: 0,
                          hEnd: value['unlock-height'],
                          withdrawLpToken: value.lpToken,
                        },
                      )}
                    >
                      WITHDRAW
                    </Button>
                  </TD>
                ) : null}
                <TD>{current_height ? getTime(value['unlock-height'], currentHeight) : '...calculating'}</TD>

              </Tr>
            ))
          }
        </Table>
      </Wrapper>
    </Section>
  );
};

export default ListLocks;
