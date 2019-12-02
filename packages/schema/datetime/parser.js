const InvalidDateError = new TypeError('Could not convert value to Date');

export function coerceToDate(value) {
  const dateValue = new Date(value);
  // An invalid date is loosly equal to `NaN`
  if (isNaN(dateValue)) throw new InvalidDateError();
  return dateValue;
}

export function serialize(value) {
  const dateValue = new Date(value).toJSON();

  if (dateValue === null) throw new InvalidDateError();

  return dateValue;
}
