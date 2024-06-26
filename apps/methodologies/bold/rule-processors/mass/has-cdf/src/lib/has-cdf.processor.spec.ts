import { loadParentDocument } from '@carrot-fndn/methodologies/bold/io-helpers';
import {
  stubDocument,
  stubDocumentEventWithMetadataAttributes,
} from '@carrot-fndn/methodologies/bold/testing';
import {
  type DocumentEvent,
  DocumentEventAttributeName,
  DocumentEventName,
  ReportType,
} from '@carrot-fndn/methodologies/bold/types';
import {
  type RuleInput,
  type RuleOutput,
  RuleOutputStatus,
} from '@carrot-fndn/shared/rule/types';
import { stubArray } from '@carrot-fndn/shared/testing';
import { random } from 'typia';

import { HasCdfProcessor } from './has-cdf.processor';

jest.mock('@carrot-fndn/methodologies/bold/io-helpers');

describe('HasCdfProcessor', () => {
  const ruleDataProcessor = new HasCdfProcessor();
  const documentLoaderService = jest.mocked(loadParentDocument);

  const { HAS_CDF, HAS_MTR, REPORT_TYPE } = DocumentEventAttributeName;
  const { CDF, MTR } = ReportType;
  const { END } = DocumentEventName;

  it.each([
    {
      event: stubDocumentEventWithMetadataAttributes({ name: END }, [
        [HAS_CDF, false],
        [REPORT_TYPE, CDF],
      ]),
      resultStatus: RuleOutputStatus.APPROVED,
      scenario:
        'should return the returValue equal to true when has-cdf is false and report-type is CDF',
    },
    {
      event: stubDocumentEventWithMetadataAttributes({ name: END }, [
        [HAS_CDF, true],
        [REPORT_TYPE, CDF],
      ]),
      resultStatus: RuleOutputStatus.APPROVED,
      scenario:
        'should return the returValue equal to true when has-cdf is true and report-type is CDF',
    },
    {
      event: stubDocumentEventWithMetadataAttributes({ name: END }, [
        [HAS_MTR, true],
        [REPORT_TYPE, MTR],
      ]),
      resultComment: ruleDataProcessor['ResultComment'].REJECTED,
      resultStatus: RuleOutputStatus.REJECTED,
      scenario:
        'should return the returValue equal to false when the END event has-mtr equal to true and report-type is MTR',
    },
    {
      event: stubDocumentEventWithMetadataAttributes(
        { name: random<Omit<DocumentEventName, 'END'>>() },
        [
          [HAS_CDF, true],
          [REPORT_TYPE, CDF],
        ],
      ),
      resultComment: ruleDataProcessor['ResultComment'].REJECTED,
      resultStatus: RuleOutputStatus.REJECTED,
      scenario:
        'should return the returValue equal to false when there is no END event',
    },
  ])(`$scenario`, async ({ event, resultComment, resultStatus }) => {
    const ruleInput = random<Required<RuleInput>>();
    const document = stubDocument({
      externalEvents: [...stubArray(() => random<DocumentEvent>(), 3), event],
    });

    documentLoaderService.mockResolvedValueOnce(document);

    const ruleOutput = await ruleDataProcessor.process(ruleInput);

    const expectedRuleOutput: RuleOutput = {
      requestId: ruleInput.requestId,
      responseToken: ruleInput.responseToken,
      responseUrl: ruleInput.responseUrl,
      resultComment,
      resultStatus,
    };

    expect(ruleOutput).toEqual(expectedRuleOutput);
  });
});
