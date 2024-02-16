#!/usr/bin/env node

/**
 * validates each field part according to min,max
 * @param {*} part
 * @param {*} min
 * @param {*} max
 * @returns integer is validation passed, else throws error
 */
function validateFieldPart(part, min, max) {
  const num = parseInt(part, 10);
  if (isNaN(num) || num.toString() !== part || num < min || num > max) {
    throw new Error(`Invalid value '${part}'. Must be an integer between ${min} and ${max}.`);
  }
  return num;
}

/**
 * parse a specific field of a cron string
 * @param {*} field
 * @param {*} max
 * @param {*} min
 * @returns return an array of numbers that this field represents.
 */
const parseCronTime = (field, max, min = 0) => {
  let range = [];
  for (let i = min; i <= max; i++) {
    range.push(i);
  }
  if (field === '*') {
    return range;
  } else if (field.includes('-')) {
    let [start, end] = field.split('-');
    start = validateFieldPart(start, min, max);
    end = validateFieldPart(end, min, max);
    return range.filter(n => n >= start && n <= end);
  } else if (field.includes('/')) {
    let [base, step] = field.split('/');
    base = base === '*' ? min : validateFieldPart(base, min, max);
    // Step cannot be 0 and must not exceed max
    step = validateFieldPart(step, 1, max);
    return range.filter(n => n >= base && (n - base) % step === 0);
  } else if (field.includes(',')) {
    return field.split(',').map(part => validateFieldPart(part, min, max));
  } else {
    return [validateFieldPart(field, min, max)];
  }
};

/**
 * Expands given cronString
 * @param {*} cronString
 * @returns an object
 */
const expandCronString = cronString => {
  const parts = cronString.trim().split(' ');
  if (parts.length !== 6) {
    throw new Error('Invalid cron string format. Please provide a string with exactly 6 parts.');
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek, command] = parts;

  return {
    minute: parseCronTime(minute, 59).join(' '),
    hour: parseCronTime(hour, 23).join(' '),
    dayOfMonth: parseCronTime(dayOfMonth, 31, 1).join(' '),
    month: parseCronTime(month, 12, 1).join(' '),
    dayOfWeek: parseCronTime(dayOfWeek, 7, 1).join(' '),
    command
  };
};

const main = () => {
  try {
    const args = process.argv.slice(2);

    if (args.length !== 1) {
      throw new Error('Usage: node your-program.js "<cron string>"');
    }

    const cronString = args[0];
    const result = expandCronString(cronString);

    console.log('minute        ', result.minute);
    console.log('hour          ', result.hour);
    console.log('day of month  ', result.dayOfMonth);
    console.log('month         ', result.month);
    console.log('day of week   ', result.dayOfWeek);
    console.log('command       ', result.command);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}

module.exports = { expandCronString };
