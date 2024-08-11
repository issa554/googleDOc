//documentSaga.js
import { takeEvery, call, put, takeLatest , take } from 'redux-saga/effects';
import { editDocument, loadDocument ,openDocument ,editUser,closeDocument} from './documentSlice';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';

const socket = io(import.meta.env.VITE_STRAPI_API_IO);

function* handleSocketConnection() {
  socket.on('connection', function(message) {
    put(editDocument(message));
  });
}

function* handleUsers() {
  const channel = createSocketChannel('user-open');
  while (true) {
    const message = yield take(channel);
    yield  put(editUser({user:message,type:"PUSH"}))

  }
}

function createSocketChannel(eventName) {
  return eventChannel(emitter => {
    socket.on(eventName, emitter);
    return () => {
      socket.off(eventName, emitter);
    };
  });
}

function* handleReceive() {
  const channel = createSocketChannel('receive-changes');
  while (true) {
    const message = yield take(channel);
    yield put(loadDocument(message));
  }
}

function* handleSendChange(action) {
  socket.emit('send-change', action.payload);
}

function* openDoc(action) {
  socket.emit("get-doc",  action.payload)
  socket.once('load-doc',  function(message) {
    put(openDocument(message)); 
  });

}
function* closeDoc(action) {
  socket.emit('end');
}

function* watchEditDocument() {
  yield takeEvery('document/initiateSocket', handleSocketConnection);
  yield takeEvery('document/initiateSocket', handleUsers);
  yield takeEvery('document/initiateSocket', handleReceive);
  yield takeLatest(editDocument.type, handleSendChange);
  yield takeEvery(openDocument.type, openDoc);
  yield takeLatest(closeDocument.type, closeDoc);
}

export default function* documentSaga() {
  yield watchEditDocument();
}
