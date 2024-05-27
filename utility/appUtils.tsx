import AsyncStorage from '@react-native-async-storage/async-storage';
export class AppUtils {
    public static TAG = "AppUtils";

    /*----------------- Store Data To Storage --------------*/

  static storeData = (key: string, value: any) => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        // If the passed value is a callback function,
        //  then call it with the existing state.
        console.log(AppUtils.TAG + "DBG STORE:" + JSON.stringify(value));
        // const encrypt = AppUtils.encrypt(value, GlobalValue.keyEncrypt);
        // console.log(AppUtils.TAG + "DBG:Encrypt: " + encrypt);
        // const valueToStore = value instanceof Function ? value(state) : value
        // window.localStorage.setItem(key, value);
        await AsyncStorage.setItem(key,value);
        resolve("1");
        console.log(AppUtils.TAG + "DBG:Store to Local Storage :Sucsess");
      } catch (err) {
        console.log(AppUtils.TAG + "DBG:ERR:" + JSON.stringify(err));
        resolve("0");
      }
    });
  };

  /*----------------- GetData From Storage --------------*/
  /*----------------- GetData From Storage --------------*/

  static getDataLocal = (key: string) => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        // let value:any = window.localStorage.getItem(key);

        let value:any =  await AsyncStorage.getItem(key);
       // const dencrypt = AppUtils.decrypt(value, GlobalValue.keyEncrypt);
        console.log(AppUtils.TAG + "DBG:VALUE LOCAL DATA: " + value);
        // Check if the local storage already has any values,
        // otherwise initialize it with the passed initialValue

        // let rawdata=JSON.parse(dencrypt)
        // let returndencryptdata=JSON.parse(rawdata)
        resolve(value);
      } catch (err) {
        console.log(AppUtils.TAG + "DBG:ERR:" + JSON.stringify(err));
        resolve("0");
      }
    });
  };

 /*----------------- Remove From Storage --------------*/
 static removeDataSession = (key: string) => {
    return new Promise<string>((resolve, reject) => {
      try {
        //window.localStorage.clear();
        AsyncStorage.clear();
        console.log(AppUtils.TAG + "DBG:Success Clear All Session Storage :Key:" + key);
        resolve("1");
      } catch (err) {
        console.log(AppUtils.TAG + "DBG:ERR:" + err);
        resolve("0");
      }
    });
  };

}


