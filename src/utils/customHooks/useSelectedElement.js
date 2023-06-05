import { useState } from 'react';

const useSelectedElement = () => {
  const [elementSelected, setElementSelected] = useState(null);

  const selectElement = (element) => {
    try {
      if (elementSelected && elementSelected?.name === element.name) {
        setElementSelected(null);
      } else {
        setElementSelected(element);
      }
    } catch (error) {
      setElementSelected(null);
    }
  };

  return [elementSelected, selectElement];
};

export default useSelectedElement;
