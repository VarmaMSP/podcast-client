// @flow
const months = [
  'Jan', 'Feb',
  'Mar', 'Apr',
  'May', 'June',
  'July', 'Aug',
  'Sept', 'Oct',
  'Nov', 'Dec'
];

export const formatDate = (dateString: string): string => {
  let date = new Date(dateString);
  return date
    ? `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
    : ''
}
