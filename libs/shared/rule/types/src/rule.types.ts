import type { AnyObject } from '@carrot-fndn/shared/types';

import { tags } from 'typia';

export type RuleEnvironment = 'DEVELOPMENT' | 'PRODUCTION';

export interface RuleInput {
  documentId: string;
  documentKeyPrefix: string;
  parentDocumentId?: string;
  requestId: string;
  responseToken: string;
  responseUrl: string & tags.Format<'url'>;
  ruleName?: string;
  // TODO: add environment
}

export enum RuleOutputStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface RuleOutput {
  requestId: string;
  responseToken: string;
  responseUrl: string & tags.Format<'url'>;
  resultComment?: string | undefined;
  resultContent?: AnyObject | undefined;
  resultStatus: RuleOutputStatus;
}

export interface IRuleDataProcessor {
  process(data: RuleInput): Promise<RuleOutput>;
}
