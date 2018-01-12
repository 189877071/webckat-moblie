const indexedDB = window.indexedDB || window.webkitIndexedDB;

const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

// 打开消息数据库
function openIndexedDB(baseName) {
    return new Promise(reslove => {
        // 连接数据库
        let dbConnect = indexedDB.open(baseName, 1);
        
        // 数据库连接成功
        dbConnect.addEventListener('success', e => reslove(e.target.result));
        
        // 创建数据仓库
        dbConnect.addEventListener('upgradeneeded', e => {
            try {
                /*
                    {
                        id: 用户id, 
                        read: [{ time: 发送时间, content: 内容, launch: he/mi },……], 
                        unread: [{ time: 发送时间, content: 内容, launch: he/mi },……] 
                    }
                */ 
                e.target.result.createObjectStore('Message', {keyPath: 'id', autoIncrement: false});
            }
            catch(err) {}
            
            try {
                /*
                    {id: 公告id, content: 公告内容, otime: 公告发布时间, title: 公告标题}
                */
                e.target.result.createObjectStore('Notice', {keyPath: 'id', autoIncrement: false});
            }
            catch(err) {}
        });
    })
}

// 打开公告数据库
function openNotice() {
    return new Promise(reslove => {
        // 连接数据库
        let dbConnect = indexedDB.open('webchat-Notice', 1);
        
        // 数据库连接成功
        dbConnect.addEventListener('success', e => reslove(e.target.result));
        
        // 创建数据仓库
        dbConnect.addEventListener('upgradeneeded', e => {
            try {
                /*
                    {id: 公告id, content: 公告内容, otime: 公告发布时间, title: 公告标题}
                */
                e.target.result.createObjectStore('Notice', {keyPath: 'id', autoIncrement: false});
            }
            catch(err) {}
        });
    })
}

// 获取指定仓库的所有数据
function allStoreData(db, store) {
    return new Promise(reslove => {
        const req = db.transaction(store, 'readonly').objectStore(store).openCursor(IDBKeyRange.lowerBound(1), 'next');
        let data = [];
        req.addEventListener('success', function() {
            let cursor = this.result;
            if(cursor) {
                data.push(cursor.value);
                cursor.continue();
            }
            else {
                reslove(data);
                db.close();
            }
        })
    })
}

// 添加或者修改数据
function putStoreData(db, store, data) {
    const req = db.transaction(store, 'readwrite').objectStore(store).put(data);
    req.addEventListener('success', () => db.close());
}

// 删除指定数据
function remove(db, store, id) {
    const req = db.transaction(store, 'readwrite').objectStore(store).openCursor(IDBKeyRange.only(id), 'next');
    
    req.addEventListener('success', function() {
        this.result && this.result.delete();
        db.close();
    })
}

// 删除所有数据
function allRemove(db, store) {
    const req = db.transaction(store, 'readwrite').objectStore(store).openCursor(IDBKeyRange.lowerBound(1), 'next');
    req.addEventListener('success', function() {
        const cursor = this.result;
        if(!cursor) {
            db.close();
            return;
        }
        cursor.delete();
        cursor.continue();
    })
}

export default {
    // 修改或者添加聊天记录
    putMessage(baseName,data) {
        if(!baseName || !data) return;
        openIndexedDB(baseName).then(db => putStoreData(db, 'Message', data));
    },
    // 获取所有聊天记录
    getAllMessage(baseName) {
        if(!baseName) return;
        return openIndexedDB(baseName).then(db => allStoreData(db, 'Message'));
    },
    // 清空所有聊天记录
    removeAllMessage(baseName) {
        if(!baseName) return;
        openIndexedDB(baseName).then(db => allRemove(db, 'Message'));
    },
    // 删除指定用户的聊天记录
    removeMessage(baseName,id) {
        if(!baseName || !id) return;
        openIndexedDB(baseName).then(db => remove(db, 'Message', id));
    },

    // 添加公告
    putNotice(data) {
        if(!data) return;
        openNotice().then(db => putStoreData(db, 'Notice', data));
    },
    // 获取所有的公告
    getAllNotice() {
        return openNotice().then(db => allStoreData(db, 'Notice'));
    },
    // 删除指定公告数据
    removeNotice(id) {
        if(!id) return;
        openNotice().then(db => remove(db, 'Notice', id));
    }
}