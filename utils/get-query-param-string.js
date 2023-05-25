/**
 * 
 * @param {Array} qps - an array of query params standardize in the form {name, value}
 * @returns {String} - the query param string
 */
export default function getQueryParamString(qps) {
    if (!qps?.length || !Array.isArray(qps)) {
        return ''
    }

    return qps.reduce((acc, qp, idx) => {
        const current = `${idx !== 0 ? '&' : ''}${qp.name}=${qp.value}`;
        return acc + current;
    }, '?')
}