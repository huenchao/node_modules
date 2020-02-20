'use strict';

/**
 * Module dependencies.
 */

var IS_NODE_DEV_RUNNER = /node\-dev$/.test(process.env._ || '');
if (!IS_NODE_DEV_RUNNER && process.env.IS_NODE_DEV_RUNNER) {
  IS_NODE_DEV_RUNNER = true;
}

module.exports = function send(child, message) {
    //我们知道nodejs通过fork api出来的对象，父子进程都会调用setupChannel，在这个函数里给target加上send的api。
    //总结：target.send !== 'function' 一定不是nodejs的js#fork的子进程。
    //https://github.com/nodejs/node/blob/master/lib/internal/child_process.js#L690
  if (typeof child.send !== 'function') {
    // not a child process
    return setImmediate(child.emit.bind(child, 'message', message));
  }

  if (IS_NODE_DEV_RUNNER || process.env.SENDMESSAGE_ONE_PROCESS) {
    // run with node-dev, only one process
    // https://github.com/node-modules/sendmessage/issues/1
    return setImmediate(child.emit.bind(child, 'message', message));
  }

  // cluster.fork(): child.process is process  worker里包了process
  // childprocess.fork(): child is process     
  var connected = child.process ? child.process.connected : child.connected;

  if (connected) {
    return child.send(message);
  }

  // just log warnning message
  var pid = child.process ? child.process.pid : child.pid;
  var err = new Error('channel closed');
  console.warn('[%s][sendmessage] WARN pid#%s channel closed, nothing send\nstack: %s',
    Date(), pid, err.stack);
};