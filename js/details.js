var vm = new Vue({
    el: '#app',
    data: {
        selBtn:{
            all:false,
            shanghai:false,
            zhejiang:false
        },
        hashVal:{
            activeHash:''
        },
        urlParameters:{
            dtVal:'',
            ddVal:''
        },
        menu:[],
        items:[]
    },
    methods: {
        GetQueryString:function (name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        activeParameters:function () {
            this.urlParameters.dtVal = this.GetQueryString('dtVal');
            this.urlParameters.ddVal = this.GetQueryString('ddVal');
        },
        activeHashChange:function () {
            var hash = window.location.hash.slice(1);
            this.hashVal.activeHash = hash;
            for(var x in this.selBtn){
                this.selBtn[x] = false;
            };
            for(var x in this.selBtn){
                if(x===hash){
                    this.selBtn[x] = true;
                };
            };
        },
        myAjax:function (url,fn) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET",url,true);
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                    var list = JSON.parse(xmlhttp.responseText);
                    fn(list);
                }
            };
            xmlhttp.send();
        },
        menuList:function () {
            this.myAjax("data/menu.json",function (list) {
                vm.menu = list;
            });
            this.myAjax("data/items.json",function (list) {
                vm.items = list;
            });
        }
    },
    computed: {
        filteredList:function () {
            var activeHashVal = this.hashVal.activeHash;
            if(activeHashVal==='all'){
                return this.items;
            } else {
                return this.items.filter(function (list) {
                    return list.city===activeHashVal;
                });
            }
        }
    }
});
vm.menuList();
vm.activeParameters();
vm.activeHashChange();

window.addEventListener("hashchange",function () {
    vm.activeHashChange();
});