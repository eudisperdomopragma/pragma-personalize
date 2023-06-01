window.chattest =  window.chattest || []

let isFirstPush = true;

export default function push(dataEvent: Record<string, unknown>) {

  let event = dataEvent;

  if(isFirstPush) {
    isFirstPush = false;

    event = {
      ...dataEvent
    }

  }

  window.chattest.push(event);

}
