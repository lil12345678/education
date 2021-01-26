import router from './router/index'

router.beforeEach((to, from, next) => {
    //判断是否有token
        
})


			// router.beforeEach((to, from, next) => {
			// 	let { Config } = require("../setting");
			// 	let Storage = require("../utility/local-storage.js").default;
			// 	let BaseOperation = require("../utility/base-operation.js").default;
			// 	let data;

			// 	try {
			// 		data = Storage.get();
			// 	} catch (error) {
			// 		window.location.href = "/login";
			// 	}

			// 	if (data && data.user) {
			// 		Config.StorageData = data;
			// 		if (to.path != "/" && to.path != "#") {
			// 			if (BaseOperation.isMenuByUrl(to.path)) next();
			// 			else next(from.path);
			// 		} else next();
			// 	} else {
			// 		window.location.href = "/login";
			// 	}
			// });