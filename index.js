// some tree util
/**
 *
 * @param nodes
 * @param childkey
 * @param child
 * @param opt
 */
function treeMap(nodes, childkey, child, opt) {

    return nodes.map(v => {
        let result = {}
        let flag = v[childkey] && v[childkey].length > 0
        if (flag) {
            result[child] = treeMap(v[childkey], childkey, child, opt)
        }

        for (let h in opt) {
            result[h] = v[opt[h]]
        }

        return result

    })
}

/**
 *
 * @param nodes
 * @param childkey
 * @param callback
 */
function treeFilter(nodes, childkey, callback) {

    return nodes.map((v, i) => {

        let flag = v[childkey] && v[childkey].length > 0
        if (flag) {
            v[childkey] = treeFilter(v[childkey], childkey, callback)
        }

        if (callback && !callback(v)) {
            return undefined
        }

        return v

    }).filter(v => v)
}

/**
 *
 * @param nodes
 * @param childkey
 * @param callback
 */
function treeWalk(nodes, childkey, callback) {

    return nodes.map((v, i) => {

        let flag = v[childkey] && v[childkey].length > 0
        if (flag) {
            v[childkey] = treeWalk(v[childkey], childkey, callback)
        }

        if (callback) callback(v)

        return v

    })
}

/**
 *
 * @param nodes
 * @param childkey
 */
function treeClean(nodes, childkey) {

    return nodes.map(v => {

        let flag = v[childkey] && v[childkey].length > 0
        if (flag) {
            v[childkey] = treeFilter(v[childkey], childkey)
        }

        return v

    }).filter(v => v)
}

export {
    treeMap,
    treeFilter,
    treeWalk,
    treeClean
}

export default {
    treeMap,
    treeFilter,
    treeWalk,
    treeClean
}
