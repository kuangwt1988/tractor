'use strict';

// Dependencies:
import tractor from 'commander';
import log from 'npmlog';

// Tasks:
import init from './init/';
import start from './start/';

log.level = 'info';

tractor
.version('0.6.9')

tractor
.command('init')
.description('initialise tractor in a project')
.action(init);

tractor
.command('start')
.description('Start the tractor server')
.action(start);

tractor.parse(process.argv);
