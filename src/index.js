import parser from 'm-svg-parser'

import EventStore, { EVENTS_MAP } from './evStore'

const vSvg = parser('<?xml version="1.0" encoding="iso-8859-1"?><svg><g><path d="12"></path></g></svg>', []);
console.log(vSvg)
