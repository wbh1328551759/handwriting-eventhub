import EventHub from '../src';

type TestCase = (message: string) => void

const test1: TestCase = (message: string) => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object, 'eventHub 应该是一个对象');
  console.log(message);
};

const test2: TestCase = (message: string) => {
  const eventHub = new EventHub();
  let called = false;

  eventHub.on('xxx', (data) => {
    called = true;
    console.assert(data === '今天汪峰演唱会');
  });

  eventHub.emit('xxx', '今天汪峰演唱会');
  console.assert(called);
  console.log(message);
};

const test3: TestCase = (message: string) => {
  const eventHub = new EventHub();
  let called = false;

  const fn1 = () => {
    called = true;
  };
  eventHub.on('yyy', fn1);
  eventHub.off('yyy', fn1);
  eventHub.emit('yyy');

  console.assert(called === false);
  console.log(message);
};

test1('EventHub 可以创建对象');
test2('.on 之后，使用 .emit 可以触发 on 中的函数');
test3('off 被触发了');
