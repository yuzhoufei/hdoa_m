var vm = new Vue({
    el : '#app',
    data : {
        menu:[],
        mainItems:[]
    },
    methods : {
        toggle:function(index) {
            if(this.menu[index].ok==true){
                this.menu[index].ok=false;
                this.menu[index].iconUp=false;
                this.menu[index].iconDown=true;
            } else {
                this.menu[index].ok=true;
                this.menu[index].iconUp=true;
                this.menu[index].iconDown=false;
            }
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
            this.myAjax("data/mainItems.json",function (list) {
                vm.mainItems = list;
            });
        }
    },
    computed : {
    }
});
vm.menuList();