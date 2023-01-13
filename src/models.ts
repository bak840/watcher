import { v4 as uuidv4 } from "uuid";

enum Mode {
  View,
  EditHour,
  EditMinute,
}

class Watch {
  id: string;
  time: Date;
  timezone: string;
  mode: Mode;
  on: boolean;

  constructor(locale: string) {
    this.id = uuidv4();
    this.time = new Date();
    this.timezone = locale;
    this.mode = Mode.View;
    this.on = true;
  }
}

export { Watch, Mode };
