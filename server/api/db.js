const mysql = require('mysql');

const { db } = require('./config');

const pool = mysql.createPool(db);

const sql = sql => new Promise((reslove, reject) => pool.query(sql, (err, results) => err ? reject(err) : reslove(results)));

exports.sql = sql;

/**
 * 插入数据
 * 实例：
 * insert({
 *     table: 'chat_session',
 *     data: {
 *         session_id: '123456789',
 *         data: '{}',
 *         time: Date.now()
 *     }
 * }).then(results => console.log(results));
 * */ 
exports.insert = ({ table, data }) => new Promise((reslove, reject) => pool.query(`INSERT INTO ${table} SET?`, data, (err, results, fields) => err ? reject(err) : reslove(results)));

/**
 * 查询数据
 * 实例：
 * select({
 *     table: 'chat_session',
 *     where: 'session_id="123456789"',
 *     key: [a, b, c],  返回的字段
 *     orderBy: {a: 1, b: -1},
 *     limit: 3 / [3, 3]
 * }).then(results => console.log(results));
 * */ 
exports.select = ({ table, key, where, orderBy, limit }) => new Promise((reslove, reject) => {
    let [o, l] = ['', ''];

    if (typeof orderBy === 'object') {
        o = 'ORDER BY ';
        for (let key in orderBy) {
            o += orderBy[key] === 1 ? `${key} desc,`: `${key} asc,`;
        }
        o = o.substring(0, o.length - 1);
    }

    limit && (l = 'LIMIT ' + (Array.isArray(limit) ? limit.join(',') : limit));

    pool.query(`SELECT ${Array.isArray(key) ? key.join(',') : '*'} FROM ${table} ${where ? 'WHERE ' + where : ''} ${o ? o : ''} ${l ? l : ''}`, (err, results) => err ? reject(err) : reslove(results));
});

/**
 * 修改数据
 * 实例：
 * update({
 *     table: 'chat_session',
 *     where: 'session_id="123456789"',
 *     data: {
 *         data: '{a: aaa}'
 *     }
 * }).then(results => console.log(results));
 * */ 
exports.update = ({ table, where, data }) => new Promise((reslove, reject) => {
    let w = '';
    for (let key in data) {
        w += `${key}=${typeof data[key] === 'string' ? "'" + data[key] + "'" : data[key]},`;
    }

    w = w.substring(0, w.length - 1);

    pool.query(`UPDATE ${table} SET ${w} WHERE ${where}`, (err, results) => err ? reject(err) : reslove(results));
});

/**
 * 删除数据
 * 实例：
 * deleted({
 *     table: 'chat_session',
 *     where: 'session_id="123456789"'
 * }).then(results => console.log(results));
 * */
exports.deleted = ({ table, where }) => new Promise((reslove, reject) => pool.query(`DELETE FROM ${table} WHERE ${where}`, (err, results) => err ? reject(err) : reslove(results)));

sql('TRUNCATE TABLE chat_session');
sql('TRUNCATE TABLE chat_autologin');
sql('TRUNCATE TABLE chat_socketloginuser')