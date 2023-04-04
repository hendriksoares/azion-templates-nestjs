/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { LoggerService } from '@nestjs/common';
import { format } from 'date-fns';

export class AzionLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {}

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.error(
      `[Azion] - ${format(
        new Date(),
        'yyyy/MM/dd, hh:mm:ss',
      )} ERROR ${message} | ${optionalParams[0]}`,
    );
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      `[Azion] - ${format(
        new Date(),
        'yyyy/MM/dd, hh:mm:ss',
      )} WARN ${message} | ${optionalParams[0]}`,
    );
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    console.debug(
      `[Azion] - ${format(
        new Date(),
        'yyyy/MM/dd, hh:mm:ss',
      )} DEBUG ${message} | ${optionalParams[0]}`,
    );
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    console.log(
      `[Azion] - ${format(
        new Date(),
        'yyyy/MM/dd, hh:mm:ss',
      )} VERBOSE ${message} | ${optionalParams[0]}`,
    );
  }
}
