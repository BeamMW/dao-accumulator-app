import { useEffect, useState } from 'react';
import { IUseValidation } from '@app/shared/interface';
import { toGroths } from '@core/appUtils';

export const useValidation = ({ value, validations }: IUseValidation) => {
  const [isEmpty, setIsEmpty] = useState<Boolean>(true);
  const [isMax, setIsMax] = useState<Boolean>(false);
  const [isValid, setIsValid] = useState<Boolean>(false);

  useEffect(() => {
    for (const key in validations) {
      const val = validations[key as keyof typeof validations];
      switch (key) {
        case 'isEmpty':
          console.log(value);
          setIsEmpty(value <= 0);
          break;
        case 'isMax':
          if (val) {
            setIsMax(val >= +value);
          }
          break;
        default:
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty) {
      setIsValid(false);
    } else setIsValid(true);
  }, [isEmpty]);

  return {
    isEmpty,
    isValid,
    isMax,
  };
};
