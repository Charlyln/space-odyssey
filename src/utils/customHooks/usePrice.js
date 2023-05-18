import { useEffect, useState } from 'react';
import { usePress } from 'react-aria';

const usePrice = () => {
  const [price, setPrice] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [moins, setMoins] = useState(false);

  let { priceProps } = usePress({
    onPressStart: (e) => {
      console.log('moins');
      if (e.target.value === 'moins') {
        setMoins(true);
        setPrice((prev) => {
          return prev - 1;
        });
      } else {
        setPressed(true);
        setPrice((prev) => {
          return prev + 1;
        });
      }
    },
    onPressEnd: (e) => {
      if (e.target.value === 'moins') {
        setMoins(false);
      } else {
        setPressed(false);
      }
    },
  });

  useEffect(() => {
    if (pressed) {
      const interval = setInterval(() => {
        setPrice((prev) => {
          if (prev <= 10) {
            return prev + 1;
          } else if (prev <= 100) {
            return prev + 10;
          } else if (prev <= 1000) {
            return prev + 100;
          } else {
            return prev + 1000;
          }
        });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [pressed]);

  useEffect(() => {
    if (moins) {
      const interval = setInterval(() => {
        setPrice((prev) => {
          if (prev <= 10) {
            return prev - 1;
          } else if (prev <= 100) {
            return prev - 10;
          } else if (prev <= 1000) {
            return prev - 100;
          } else if (prev <= 10000) {
            return prev - 1000;
          } else if (prev <= 100000) {
            return prev - 10000;
          } else {
            return prev - 1;
          }
        });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [moins]);

  return [price, setPrice, priceProps];
};

export default usePrice;
