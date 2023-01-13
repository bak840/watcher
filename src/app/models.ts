import { v4 as uuidv4 } from "uuid";
import {
  addHoursToDate,
  addMinutesToDate,
  addOneSecondToDate,
  dateWithHoursOffset,
} from "../utils/date_utils";

enum Mode {
  Live = 0,
  EditHour = 1,
  EditMinute = 2,
}

class Watch {
  id: string;
  time: Date;
  mode: Mode;
  on: boolean;

  /* constructor(timeOffset: number) {
    this.id = uuidv4();
    this.time = dateWithHoursOffset(timeOffset);
    this.mode = Mode.Live;
    this.on = Math.random() < 0.5;
  } */

  constructor(id: string, time: Date, mode: Mode, on: boolean) {
    this.id = id;
    this.time = time;
    this.mode = mode;
    this.on = on;
  }

  switchLight() {
    this.on = !this.on;
  }

  isEditing() {
    return this.mode !== Mode.Live;
  }

  nextMode() {
    switch (this.mode) {
      case Mode.Live:
        this.mode = Mode.EditHour;
        break;
      case Mode.EditHour:
        this.mode = Mode.EditMinute;
        break;
      case Mode.EditMinute:
        this.mode = Mode.Live;
        break;
      default:
        break;
    }
  }

  increase() {
    if (this.mode === Mode.EditHour) {
      this.time = addHoursToDate(this.time, 1);
    } else if (this.mode === Mode.EditMinute) {
      this.time = addMinutesToDate(this.time, 1);
    }
  }

  move() {
    this.time = addOneSecondToDate(this.time);
  }
}

function watchFromOffset(offset: number) {
  return new Watch(
    uuidv4(),
    dateWithHoursOffset(offset),
    Mode.Live,
    Math.random() < 0.5
  );
}

export { Watch, Mode, watchFromOffset };
