// @flow
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export function timeElapsed(dateString: string): number {
  let d = new Date(dateString);
  let D = new Date();
  return Math.floor((D - d) / 60000);
}

export function formatDate(dateString: string): string {
  let date = new Date(dateString);
  return date ? `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}` : '';
}

export function stripNonUTF8(str: string) {
  return str.replace(/[\u0800-\uFFFF]/g, '');
}
