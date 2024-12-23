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

export {
    removeDuplicates4array
}




