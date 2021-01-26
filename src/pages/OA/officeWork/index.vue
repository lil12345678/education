<template>
<div>
    <div>officework</div>
    测试http调用
    <button @click="getToken">获取Token</button>
    测试请求数据
     <button @click="getData">获取数据</button>
</div>
</template>


<script>
import axios from '../../../router/axios'

    export default  {
		props: {},
		data() {
			return {
				
			};
		},
		methods: {
			getToken() {
                axios({
                    method: "POST",
                    url: "http://127.0.0.1:8081/token",
                    responseType: "JSON",
                    headers: {
                        'Content-Type': "application/json",
                    },
                    data: JSON.stringify({
                        "UserKey": "PortalAdmin",
                        "PassWord": "U2FsdGVkX1+6PSwGsREQY0eY0hLxurzEGe5wpS1xz3g="
                    })
                }).then(req => {
                    alert(req.data.data.Token);
                    window.token = req.data.data.Token;
                });
            },
            getData() {
                axios({
                    method: "GET",
                    url: "http://127.0.0.1:8081/portal/app/type_list",
                    responseType: "JSON"
                }).then(req => {
                    alert(req.data.data);
                });
            }
		},
		components: {}
	};
</script>