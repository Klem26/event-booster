import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { Stack } from "@pnotify/core";
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const stackBottomModal = new Stack({
  dir1: 'up', 
  dir2: 'left',
  firstpos1: 20, 
  firstpos2: 20,
  push: 'top', 
  modal: false, 
  overlayClose: false,  
  context: document.body,
});

export default function notificationError() {
  alert({
    text: `Данные по запросу не найдены. Повторите запрос.`,
    width: "350px",
    type: ["notice"],
    stack: stackBottomModal,
    styling: 'brighttheme',
    icons: 'brighttheme',
    closer: true,
    closerHover: false,
    sticker: false,
  })
}
