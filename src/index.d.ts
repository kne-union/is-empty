/**
 * 判断值是否为非空
 * - 对象：至少有一个属性的值为真值（递归判断）
 * - 数组：至少有一个元素的值为真值（递归判断）
 * - 数字：有效数字（非 NaN），0 也是非空
 * - 字符串：非空字符串
 * - boolean：始终返回 true
 * - null/undefined：返回 false
 * @param value 需要判断的值
 * @returns 是否为非空
 */
export function isNotEmpty(value: any): boolean;

/**
 * 判断值是否为空，是 isNotEmpty 的反向函数
 * @param value 需要判断的值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean;

/**
 * 递归过滤对象或数组中的空值
 * 
 * 过滤规则：
 * - 过滤：null、undefined、空字符串 ''、空对象 {}、空数组 []
 * - 保留：数字 0、布尔值 false、非空字符串、非空对象、非空数组
 * 
 * @param value 需要过滤的值，默认为空对象
 * @returns 过滤后的值
 */
export function filterEmpty<T extends object>(value?: T): Partial<T>;
export function filterEmpty<T extends any[]>(value?: T): Partial<T>[number][];
export function filterEmpty(value?: object | any[]): object | any[];
