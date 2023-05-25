import getQueryParamString from "@/utils/get-query-param-string";

describe('getQueryParamString util', () => {
    test('returns a correct qp string given some qps values', () => {
        const qps = [
            {
                name: 'qp1',
                value: '1'
            },
            {
                name: 'qp2',
                value: '2'
            }
        ]

        const expectedString = '?qp1=1&qp2=2';
        expect(getQueryParamString(qps)).toBe(expectedString)
    });

    test('returns an empty string if invalid input', () => {
        expect(getQueryParamString('invalid')).toBe('')
    });

});