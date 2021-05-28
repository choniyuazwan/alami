import {toast} from 'react-toastify';

export const alert = (toastMessage, toastType) => {
  toast.configure();
  return toast(toastMessage, {
    type: toastType,
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    closeOnClick: true,
  });
}
