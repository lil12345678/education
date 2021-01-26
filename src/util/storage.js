import CryptoJS from "crypto-js";//加密
//import { Config } from '../setting';
const Config = {
	ResourceDefUrl: "/webserver/ajax/",
	LogDefUrl: "/webserver/log/",
	// 服务连接方式，直连还是通过服务发现。
	ServerType: "",
	// Http的请求方式，除了jq，其他都不支持参数的同步定义。
	AjaxType: "axios",
	AESKey: "AESKey",
	StorageKey: "kindgardenlily11",
	StorageData: {
		user: {
			id: null,
			name: null,
			role: null,
		}
	},
	RoleToModules: {
		global_admin: [],
		other: []
	},
	// global_admin必须保持在第一个。
	Role: {
		global_admin: "系统管理员",
		other: "普通用户"
	}
};

export function set(value) {
	if (value) {
		sessionStorage.setItem(Config.StorageKey, CryptoJS.AES.encrypt(JSON.stringify(value), Config.AESKey));
	}
};
export function get() {
	let storage = sessionStorage.getItem(Config.StorageKey);
	if (!storage) return null;
	return JSON.parse(CryptoJS.AES.decrypt(
		storage,
		Config.AESKey).toString(CryptoJS.enc.Utf8));
}
export function remove() {
	sessionStorage.removeItem(Config.StorageKey);
}
export function clear() {
	sessionStorage.clear();
}

