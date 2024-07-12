import type { EvaluateResultOutput } from '@carrot-fndn/shared/rule/standard-data-processor';

import { metadataAttributeValueIsAnyOf } from '@carrot-fndn/methodologies/bold/predicates';
import { ParentDocumentRuleProcessor } from '@carrot-fndn/methodologies/bold/processors';
import {
  type Document,
  type DocumentEvent,
  DocumentEventAttributeName,
  DocumentEventMoveType,
  DocumentEventVehicleType,
} from '@carrot-fndn/methodologies/bold/types';
import { RuleOutputStatus } from '@carrot-fndn/shared/rule/types';

const { PICK_UP, SHIPMENT_REQUEST } = DocumentEventMoveType;
const { MOVE_TYPE, VEHICLE_TYPE } = DocumentEventAttributeName;

export class VehicleTypeProcessor extends ParentDocumentRuleProcessor<
  DocumentEvent[]
> {
  private ResultComment = {
    APPROVED: 'The vehicle-type attribute is present in the document',
    NOT_APPLICABLE:
      'Rule not applicable: No events with move-type attribute found in the document',
    REJECTED:
      'The vehicle-type attribute is not correct or not present in the document',
  };

  protected override evaluateResult(
    events: DocumentEvent[],
  ): EvaluateResultOutput {
    const resultStatus = events.every(
      metadataAttributeValueIsAnyOf(
        VEHICLE_TYPE,
        Object.values(DocumentEventVehicleType),
      ),
    )
      ? RuleOutputStatus.APPROVED
      : RuleOutputStatus.REJECTED;

    return {
      resultComment:
        resultStatus === RuleOutputStatus.APPROVED
          ? this.ResultComment.APPROVED
          : this.ResultComment.REJECTED,
      resultStatus,
    };
  }

  protected override getMissingRuleSubjectResultComment(): string {
    return this.ResultComment.NOT_APPLICABLE;
  }

  protected override getRuleSubject(
    document: Document,
  ): DocumentEvent[] | undefined {
    return document.externalEvents?.filter(
      metadataAttributeValueIsAnyOf(MOVE_TYPE, [PICK_UP, SHIPMENT_REQUEST]),
    );
  }
}
