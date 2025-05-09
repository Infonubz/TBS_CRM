import { useEffect } from 'react';

const usePreventDragAndDrop = (ref) => {
  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      const data = event.dataTransfer.getData('text');
      if (!data) {
        event.preventDefault();
      }
    };

    if (ref.current) {
      ref.current.addEventListener('dragover', handleDragOver);
      ref.current.addEventListener('drop', handleDrop);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('dragover', handleDragOver);
        ref.current.removeEventListener('drop', handleDrop);
      }
    };
  }, [ref]);
};

export default usePreventDragAndDrop;