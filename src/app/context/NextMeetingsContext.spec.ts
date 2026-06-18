import { NextMeetingsContext } from './NextMeetingsContext';
import { Meeting } from '../models/Meeting.model';

function meetingAt(offsetMs: number): Meeting {
  return { datetime: new Date(Date.now() + offsetMs).toISOString() } as Meeting;
}

const HOUR = 60 * 60 * 1000;

describe('NextMeetingsContext', () => {
  let context: NextMeetingsContext;

  beforeEach(() => {
    context = new NextMeetingsContext();
  });

  it('includes a meeting in the future', () => {
    context.findNextMeetings([meetingAt(7 * 24 * HOUR)]);
    expect(context.nextMeetings.length).toBe(1);
  });

  it('still includes a meeting that started within the 4h duration window', () => {
    context.findNextMeetings([meetingAt(-1 * HOUR)]);
    expect(context.nextMeetings.length).toBe(1);
  });

  it('excludes a meeting that ended more than 4h ago', () => {
    context.findNextMeetings([meetingAt(-5 * HOUR)]);
    expect(context.nextMeetings.length).toBe(0);
  });

  it('keeps only upcoming meetings from a mixed list', () => {
    context.findNextMeetings([meetingAt(-5 * HOUR), meetingAt(2 * HOUR), meetingAt(10 * 24 * HOUR)]);
    expect(context.nextMeetings.length).toBe(2);
  });

  it('pushes deep clones, not references to the originals', () => {
    const original = meetingAt(2 * HOUR);
    context.findNextMeetings([original]);
    expect(context.nextMeetings[0]).not.toBe(original);
    expect(context.nextMeetings[0].datetime).toBe(original.datetime);
  });
});
