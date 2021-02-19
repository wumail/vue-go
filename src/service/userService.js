/* eslint-disable indent */
import requst from '@/utils/request';

// 用户注册
const register = ({ name, password }) => {
    return requst.post('/register', { name, password });
};

// 用户登录
const login = ({ name, password }) => {
    return requst.post('/login', { name, password });
};
// 获取用户信息
const info = () => {
    return requst.get('/info');
};

// 发布文章
const publish = ({
    title, description, content,
}) => {
    return requst.post('/posts', {
        title, description, content,
    });
};

// 显示文章
const showPost = (url) => {
    return requst.get(url);
};
// 修改文章
const update = (url, {
    title, description, content,
}) => {
    return requst.put(url, { title, description, content });
};
// 删除文章
const deletep = (url) => {
    return requst.delete(url);
};
// 显示文件列表
const pagelist = (url) => {
    return requst.post(url);
};
// 我的文章
const mypost = (url) => {
    return requst.post(url);
};

// 提交代码
const putcode = ({
    code, title,
}) => {
    return requst.post('/codes', {
        code, title,
    });
};

// 修改代码
const updatecode = (url, { code, title }) => {
    return requst.put(url, { code, title });
};
// 显示代码
const showcode = (url) => {
    return requst.get(url);
};
// 删除代码
const deletecode = (url) => {
    return requst.delete(url);
};
// 显示代码列表
const codelist = (url) => {
    return requst.post(url);
};
// 我的代码
const mycode = () => {
};

// 发布问题
const publishQuest = ({
    title, description, content,
}) => {
    return requst.post('/quests', {
        title, description, content,
    });
};

// 显示问题
const showQuest = (url) => {
    return requst.get(url);
};
// 修改问题
const updateQuest = (url, {
    title, description, content,
}) => {
    return requst.put(url, { title, description, content });
};
// 删除问题
const deleteQuest = (url) => {
    return requst.delete(url);
};
// 显示问题列表
const questlist = (url) => {
    return requst.post(url);
};

export default {
    register,
    login,
    info,
    publish,
    showPost,
    update,
    deletep,
    pagelist,
    putcode,
    updatecode,
    showcode,
    deletecode,
    codelist,
    mypost,
    mycode,
    publishQuest,
    showQuest,
    updateQuest,
    deleteQuest,
    questlist,
};
