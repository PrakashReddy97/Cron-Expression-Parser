let expect;

before(async () => {
  const chai = await import('chai');
  expect = chai.expect;
});

describe('Cron Parser', function () {
  const { expandCronString } = require('../src/cron_parser');

  // Happy Cases

  // correctly parsing a valid cron string
  it('correctly parses a valid cron string', function () {
    const validCronString = '*/15 0 1,15 * 1-5 /usr/bin/find';
    const result = expandCronString(validCronString);

    expect(result.minute).to.equal('0 15 30 45');
    expect(result.hour).to.equal('0');
    expect(result.dayOfMonth).to.equal('1 15');
    expect(result.month).to.equal('1 2 3 4 5 6 7 8 9 10 11 12');
    expect(result.dayOfWeek).to.equal('1 2 3 4 5');
    expect(result.command).to.equal('/usr/bin/find');
  });

  // correctly parsing a valid cron string with specific values.
  it('correctly parses cron string with specific values', function () {
    const specificTimeCronString = '0 4 * * 1 /usr/bin/find';
    const result = expandCronString(specificTimeCronString);

    expect(result.minute).to.equal('0');
    expect(result.hour).to.equal('4');
    expect(result.dayOfMonth).to.equal(
      '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31'
    );
    expect(result.month).to.equal('1 2 3 4 5 6 7 8 9 10 11 12');
    expect(result.dayOfWeek).to.equal('1');
    expect(result.command).to.equal('/usr/bin/find');
  });

  // Negative Cases

  // check if function handles invalid cron strings
  it('returns an error for invalid cron strings', function () {
    let invalidCronString = 'invalid_cron_string';

    expect(() => {
      expandCronString(invalidCronString);
    }).to.throw(Error);
  });

  // check if function handles out of range values.
  it('returns an error for out of range values', function () {
    let cronStringOutOfRange = '60 * * * * /usr/bin/find';

    expect(() => {
      expandCronString(cronStringOutOfRange);
    }).to.throw(Error);
  });
});
