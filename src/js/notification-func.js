import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { notice, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import { Stack } from "@pnotify/core";

defaultModules.set(PNotifyMobile, {});

export default function notificationError() {
  notice ({
    text: `Данные по запросу не найдены. Повторите запрос.`,
    width: "350px",
    stack: new Stack({
      dir1: 'up', dir2: 'left', firstpos1: 20, firstpos2: 20}),
    closerHover: false,
    sticker: false
  })
}