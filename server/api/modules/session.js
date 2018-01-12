const { tables: { session } } = require('../config');

const { getVerify } = require('../fn');

module.exports = (req, res, next) => {
   
    let [sessionData, id] = [{}, req.cookies.session_id];

    // 创建新的 session
    const createSession = () => {
        id = Date.now() + getVerify(5);
        res.cookie('session_id', id);
        req.cookies.session_id = id;
        req.insert(
            {
                table: session,
                data: {
                    session_id: id,
                    data: '{}',
                    time: Date.now()
                }
            })
            .then(() => next())
            .catch(err => req.log('添加session_id失败') | res.json({ err }));
    }

    // 获取session数据
    const getSession = () => req.select({ table: session, where: `session_id='${id}'` }).then(results => {
        // 如果不存在就创建一个新的
        if (!results || !results.length) {
            createSession();
            return;
        }
        // 如果session存在就获取到所有的session的值
        sessionData = JSON.parse(results[0].data);
        req.update(
            {
                table: session,
                where: `session_id='${id}'`,
                data: { time: Date.now() }
            })
            .then(() => next())
            .catch(err => res.json({ err }));
    }).catch(err => res.json({ err }));

    const update = reslove => req.update(
        {
            table: session,
            data: {
                data: JSON.stringify(sessionData)
            },
            where: `session_id='${id}'`
        })
        .then(reslove)
        .catch(err => req.log('修改session数据失败') | res.json({ err: err }));

    // 获取指定session
    req.getSession = key => key ? sessionData[key] : sessionData;

    // 设置session
    req.setSession = (key, val) => new Promise(reslove => (sessionData[key] = val) | update(reslove));

    // 删除session
    req.rmSession = key => new Promise(reslove => delete sessionData[key] | update(reslove));

    id ? getSession() : createSession();
}

