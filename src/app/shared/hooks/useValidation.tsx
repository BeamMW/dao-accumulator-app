import { useEffect, useState } from 'react';
import { IUseValidation } from '@app/shared/interface';

export const useValidation = ({ value, validations }: IUseValidation) => {
  const [isEmpty, setIsEmpty] = useState<Boolean>(true);
  // const [isMax, setIsMax] = useState<Boolean>(false);
  const [isValid, setIsValid] = useState<Boolean>(false);

  useEffect(() => {
    for (const key in validations) {
      // const val = validations[key as keyof typeof validations];
      switch (key) {
        case 'isEmpty':
          setIsEmpty(!value);
          break;
        default:
      }
    }
  },[value]);

  useEffect(() => {
    if (isEmpty) {
      setIsValid(false);
    } else setIsValid(true);
  }, [isEmpty]);

  return {
    isEmpty,
    isValid,
    // isMax,
  };
};
