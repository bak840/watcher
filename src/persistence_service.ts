import { Watch } from "./app/models";

interface PersistenceService {
  save(watches: Watch[]): void;
  load(): Watch[];
}

type SerializedWatch = { id: string; time: string; mode: number; on: boolean };

class LocalStoragePersistanceService implements PersistenceService {
  save(watches: Watch[]): void {
    localStorage.setItem("watches", JSON.stringify(watches));
  }

  load(): Watch[] {
    const raw = localStorage.getItem("watches");
    if (raw === null) return [];
    const data: SerializedWatch[] = JSON.parse(raw);
    return data.map((w) => new Watch(w.id, new Date(w.time), w.mode, w.on));
  }
}

export { type PersistenceService, LocalStoragePersistanceService };
