import 'izitoast/dist/css/iziToast.min.css'; 
import iziToast from 'izitoast/dist/js/iziToast.min.js'; 
 
export default function notificationError(
  title = 'OOPS!',
  message = 'No results found. Please, enter a new request.',
  color = '#DC56C5',
) {
  iziToast.show({
    title,
    message,
    messageSize: '14px',
    theme: 'dark',
    color,
    position: 'bottomRight',
    closeOnEscape: true,
    closeOnClick: true,
  });
}