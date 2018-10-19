class HashTable {
  constructor() {
    this.size = 0;
    this.limit = 8;
    this.storage = new LimitedArray(this.limit);
  }

  insert(k, v) {
    const index = getIndex(k, this.limit);
    const bucket = this.storage.get(index) || [];

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === k) {
        tuple[1] = v;
        return;
      }
    }

    bucket.push([k, v]);
    this.storage.set(index, bucket);
    return ++this.size;
  }

  retrieve(k) {
    const index = getIndex(k, this.limit);
    const bucket = this.storage.get(index) || [];

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === k) return tuple[1];
    }
    return undefined;
  }

  remove(k) {
    const index = getIndex(k, this.limit);
    const bucket = this.storage.get(index) || [];

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === k) {
        bucket.slice(i, 1);
        return tuple[1];
      }
    }
    return undefined;
  }
}
