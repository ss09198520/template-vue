
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
    驗證傳入電號是否為全數字11碼
    */
    validateEletricNums (nums) {
        const numsPattern = /^[0-9\uFF10-\uFF19]{11}$/;
        return numsPattern.test(nums);
    },

     /*
    驗證傳入字串是否為英文或中文
    */
   validateName(name){
    const namePattern = /^[\u4e00-\u9fa5_a-zA-Z]+$/;
    return namePattern.test(name);
   },

   /*
    驗證傳入日期格式是否正確 2021-09-10
    */
    validateDate(date){
        const namePattern = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        return namePattern.test(date);
    },


    /*
    驗證傳入日期時間格式是否正確 2021-09-10 08:00:00
    */
    validateDateTime(dateTime){
        const namePattern = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
        return namePattern.test(dateTime);
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