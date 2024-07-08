export function smileConvert(number: number) {
  if (number === 1) {
    return 'Not at all';
  }
  if (number === 2) {
    return 'A little disliked';
  }
  if (number === 3) {
    return 'Neutral';
  }
  if (number === 4) {
    return "It's a little weird";
  }
  if (number === 5) {
    return 'Absolutely like';
  }
}
