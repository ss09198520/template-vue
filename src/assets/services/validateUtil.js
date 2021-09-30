
/*
ValidateUtil
  格式驗證，包含: 是否為空、全數字......待補
*/
const ValidateUtil = {
    
    /*
    驗證傳入字串是否全為數字
    */
    validateNums (nums) {
        const numsPattern = /^[0-9\uFF10-\uFF19]+$/;
        return numsPattern.test(nums);
    },


    /*
    驗證傳入參數是否為空(null、空字串、空陣列)
    true : empty
    false : not empty
    */
    isEmpty (data) {
        let result = true;
        if ((data != null) && (data != undefined)) {
            // 陣列
            if (Array.isArray(data)) {
                if (data.length > 0) {
                    result = false;
                }
            }
            // 字串
            else if (typeof data === 'string') {
                if (data.trim() != '') {
                    result = false;
                }
            }
            // 數字
            else if (typeof data === 'number') {
                if (String(data).trim() != '') {
                    result = false;
                }
            }
            // 日期物件
            else if (data instanceof Date) {
                if (data != undefined) {
                    result = false;
                }
            }
            // 物件
            else if (typeof data === 'object') {
                // eslint-disable-next-line no-unused-vars
                for (let index in data) {
                    result = false;
                    break;
                }
            }
            // function
            else if (typeof data === 'function') {
                if (data != undefined) {
                    result = false;
                }
            }
            // boolean
            else if (typeof data === 'boolean') {
                if (data != null) {
                    result = false;
                }
            }
        }
        return result;
    },

};

export default ValidateUtil;