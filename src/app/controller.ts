import { cities } from "../cities";
import {
  LocalStoragePersistanceService,
  PersistenceService,
} from "../persistence_service";
import { Mode, Watch, watchFromOffset } from "./models";

class Controller {
  watches: Watch[];
  persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new LocalStoragePersistanceService();

    const savedData = this.persistenceService.load();
    if (savedData.length !== 0) {
      this.watches = savedData;
    } else {
      this.watches = [watchFromOffset(0)];
    }
  }

  commit() {
    document.dispatchEvent(new Event("rerender"));
    this.persistenceService.save(this.watches);
  }

  moveAll() {
    this.watches.filter((w) => w.mode === Mode.Live).forEach((w) => w.move());
    this.commit();
  }

  handleClear() {
    this.watches = [];
    this.commit();
  }

  handleAddWatch(city: string) {
    const offset = cities.filter((c) => c.id === city)[0].timeOffset;
    this.watches.push(watchFromOffset(offset));
    this.commit();
  }

  getIndexOfWatchById(id: string) {
    return this.watches.findIndex((w) => w.id === id);
  }

  handleWatchLight(id: string) {
    const watchIndex = this.getIndexOfWatchById(id);
    this.watches[watchIndex].switchLight();
    this.commit();
  }

  handleWatchMode(id: string) {
    const watchIndex = this.getIndexOfWatchById(id);
    this.watches[watchIndex].nextMode();
    this.commit();
  }

  handleWatchIncrease(id: string) {
    const watchIndex = this.getIndexOfWatchById(id);
    this.watches[watchIndex].increase();
    this.commit();
  }

  handleWatchDelete(id: string) {
    this.watches = this.watches.filter((w) => w.id !== id);
    this.commit();
  }
}

export { Controller };
