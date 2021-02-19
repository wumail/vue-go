import storageService from '@/service/storageService';
import userService from '@/service/userService';

const userModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        // eslint-disable-next-line max-len
        userInfo: storageService.get(storageService.USER_INFO) ? JSON.parse(storageService.get(storageService.USER_INFO)) : null,
        postnum: 0,
    },
    mutations: {
        SET_TOKEN(state, token) {
            // 更新本地 缓存
            storageService.set(storageService.USER_TOKEN, token);
            // 更新state
            state.token = token;
        },
        SET_USERINFO(state, userInfo) {
            // 更新本地 缓存
            storageService.set(storageService.USER_INFO, JSON.stringify(userInfo));
            // 更新state
            state.userInfo = userInfo;
        },
        ADD_COUNT(state, postload) {
            state.postnum += postload;
        },

    },
    actions: {
        register(context, { name, password }) {
            return new Promise((resolve, reject) => {
                userService.register({ name, password }).then((res) => {
                    // 保存token
                    context.commit('SET_TOKEN', res.data.data.token);
                    //
                    // vuex重构 保存token
                    // this.$store.commit('userModule/SET_TOKEN', res.data.data.token);
                    //
                    // 未vuex重构 保存token
                    // storageService.set(storageService.USER_TOKEN, res.data.data.token);
                    return userService.info();
                }).then((res) => {
                    // 保存用户信息
                    context.commit('SET_USERINFO', res.data.user);
                    // this.$store.commit('userModule/SET_USERINFO', res.data.user);
                    // eslint-disable-next-line max-len
                    // storageService.set(storageService.USER_INFO, JSON.stringify(response.data.user));
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        login(context, { name, password }) {
            return new Promise((resolve, reject) => {
                userService.login({ name, password }).then((res) => {
                    // 保存token
                    context.commit('SET_TOKEN', res.data.data.token);
                    return userService.info();
                }).then((res) => {
                    // 保存用户信息
                    context.commit('SET_USERINFO', res.data.user);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        logout({ commit }) {
            // 清除token
            commit('SET_TOKEN', '');
            storageService.set(storageService.USER_TOKEN, '');
            // 清除用户信息
            commit('SET_USERINFO', '');
            storageService.set(storageService.USER_INFO, '');
            window.location.reload();
        },

    },
};
export default userModule;
