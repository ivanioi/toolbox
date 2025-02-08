/**
 * No recursion
 * @param {} array 
 */
function removeDuplicates4array(array) {
    let tmp = {}
    for (const key of array) {
        tmp[key.trim()] = ''
    }
    return [...Object.getOwnPropertyNames(tmp)]
}

function isArrayEquals(arr1, arr2) {
    if (!(arr1 || arr2)) return true;
    if (!arr1) return false;
    if (!arr2) return false;

    if (arr1.length != arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

export {
    removeDuplicates4array,
    isArrayEquals
}




