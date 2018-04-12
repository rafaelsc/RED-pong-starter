export default class KeyPressMapCallBack {

    constructor(allowedKeysCodesAndCallBacks){
        this.allowedKeysCodesAndCallBacks = allowedKeysCodesAndCallBacks;
        this.keyPressedMap = new Map();
        for (const key of allowedKeysCodesAndCallBacks.keys()) {
            this.keyPressedMap.set(key, false);
        }
    }

    release(code){
        if(!this.keyPressedMap.has(code)){
            return false;
        }
        this.keyPressedMap.set(code, false);
        return true;
    }

    press(code){
        if(!this.keyPressedMap.has(code)){
            return false;
        }
        this.keyPressedMap.set(code, true);
        this.callBackFromAllPressedKeys();
        return true;
    }

    callBackFromAllPressedKeys() {
        for (const [keyCode, isPressed] of this.keyPressedMap) {
            if(isPressed){
                this.allowedKeysCodesAndCallBacks.get(keyCode)();
            }
        }
    }
}
