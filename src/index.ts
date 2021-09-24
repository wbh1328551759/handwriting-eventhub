class EventHub {
  private cache: { [key: string]: Array<(data: unknown) => void> } = {};
  // {
  //   '人民日报': [fn1, fn2],
  //   '潜江日报': [fn1, fn2],
  // }
  on(eventName: string, fn: (data: unknown) => void) {
    // 把 fn 放入 this.cache[eventName]
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }

  emit(eventName: string, data?: unknown) {
    // 把 this.cache[eventName] 里的 fn 全部执行一遍
    if (this.cache[eventName] === undefined) {
      this.cache[eventName] = [];
    }
    (this.cache[eventName] || []).forEach(fn => fn(data));
  }

  off(eventName: string, fn: (data: unknown) => void) {
    // 把 fn 从 this.cache[eventName] 数组中删除
    const index = indexOf(this.cache[eventName], fn);
    if (index === -1) return;
    this.cache[eventName].splice(index, 1);
  }
}

export default EventHub;

/**
 * 帮助函数 indexOf
 * @param array
 * @param item
 */
function indexOf(array: Array<(data: unknown) => void>, item: (data: unknown) => void) {
  if (array === undefined) return -1;

  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i;
      break;
    }
  }
  return index;
}
