export default class Utils {
  static sum(arr: number[]): number {
    let sum: number = 0;
    let d: number = arr.length;
    while (d--) {
      sum += arr[d];
    }
    return sum;
  }

  static pad(n: number, width: number, z: string): string {
    z = z || '0';
    const nStr = String(n);
    return nStr.length >= width ? String(n) : new Array(width - nStr.length + 1).join(z) + n;
  }

  static hasLength(array: any[]) {
    if (array && array.constructor === Array) {
      if (array.length > 0) {
        return true;
      }
    }

    return false;
  }

  static updateQueryStringParameter(uri: string, key: string, value: string | number | boolean): string {
    const re: RegExp = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
    const separator: string = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
      return uri.replace(re, `$1${key}=${value}$2`);
    }

    return `${uri}${separator}${key}=${value}`;
  }

  static isFastConnection() {
    const { connection, mozConnection, webkitConnection } = window.navigator as any;
    const connectionObj = connection || mozConnection || webkitConnection;

    // Test connection speed is 4g or greater
    return connectionObj ? connectionObj.downlink > 2 : true;
  }
}
