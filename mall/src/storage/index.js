// Storage 封装
const STORAGE_KEY = 'mall'
export default{
    //存储值
    setItem(key,value,modul_name){
        if(modul_name){
            let val = this.getItem(modul_name);
            val[key] = value;
            this.setItem(modul_name,val);
        }else{
            let val = this.getStorage();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
        }
       
    },
    //获取某一个模块下的属性user下面的userName
    getItem(key,modul_name){
        if(modul_name){
            let val = this.getItem(modul_name);
            if(val) return val[key];
        }
        return this.getStorage()[key];
    },
    getStorage(){
        JSON.parse (window.sessionStorage.getItem(STORAGE_KEY) || '{}');    
        return 
    },
    clear(key,modul_name){
        let val = this.getStorage();
        if(modul_name){
            if(!val[modul_name]) return;
            delete val [modul_name][key];

        }else{
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
    }
}