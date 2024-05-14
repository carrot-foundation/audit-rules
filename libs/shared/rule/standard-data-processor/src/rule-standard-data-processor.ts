import { RuleDataProcessor } from '@carrot-fndn/shared/app/types';
import { isNil } from '@carrot-fndn/shared/helpers';
import { mapToRuleOutput } from '@carrot-fndn/shared/rule/result';
import {
  type RuleInput,
  type RuleOutput,
  RuleOutputStatus,
} from '@carrot-fndn/shared/rule/types';

export interface EvaluateResultOutput {
  resultComment?: string | undefined;
  resultStatus: RuleOutputStatus;
}

export abstract class RuleStandardDataProcessor<
  InputDocument,
  RuleSubject,
> extends RuleDataProcessor {
  protected getDocumentNotFoundResultComment(documentId: string): string {
    return `Could not load the document with id ${documentId}`;
  }

  protected getMissingRuleSubjectResultComment(): string {
    return 'Rule not applicable';
  }

  async process(ruleInput: RuleInput): Promise<RuleOutput> {
    const document = await this.loadDocument(ruleInput);

    if (isNil(document)) {
      return mapToRuleOutput(ruleInput, RuleOutputStatus.REJECTED, {
        resultComment: this.getDocumentNotFoundResultComment(
          String(ruleInput.parentDocumentId),
        ),
      });
    }

    const ruleSubject = this.getRuleSubject(document);

    if (isNil(ruleSubject)) {
      return mapToRuleOutput(ruleInput, RuleOutputStatus.APPROVED, {
        resultComment: this.getMissingRuleSubjectResultComment(),
      });
    }

    const { resultComment, resultStatus } =
      await this.evaluateResult(ruleSubject);

    return mapToRuleOutput(ruleInput, resultStatus, {
      ...(resultComment && {
        resultComment,
      }),
    });
  }

  protected abstract evaluateResult(
    data: RuleSubject,
  ): EvaluateResultOutput | Promise<EvaluateResultOutput>;

  protected abstract getRuleSubject(
    document: InputDocument,
  ): RuleSubject | undefined;

  protected abstract loadDocument(
    ruleInput: RuleInput,
  ): Promise<InputDocument | undefined>;
}
