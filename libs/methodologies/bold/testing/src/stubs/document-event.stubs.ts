import type { AnyObject } from '@carrot-fndn/shared/types';
import type { PartialDeep } from 'type-fest';

import {
  type DocumentEvent,
  DocumentEventActorType,
  type DocumentEventAttachment,
  type DocumentEventAttribute,
  DocumentEventAttributeName,
  type DocumentEventAttributeValue,
  DocumentEventName,
  type DocumentReference,
  ReportType,
} from '@carrot-fndn/methodologies/bold/types';
import { faker } from '@faker-js/faker';
import { random } from 'typia';

import { stubAddress } from './address.stubs';
import { stubAuthor, stubParticipant } from './participant.stubs';

const isPropertyOverridenWithUndefined = <T extends AnyObject>(
  item: T,
  key: keyof T,
  // eslint-disable-next-line security/detect-object-injection
) => Object.hasOwn(item, key) && item[key] === undefined;

export const stubDocumentEvent = (
  partialEvent: PartialDeep<DocumentEvent> = {},
): DocumentEvent => ({
  ...random<DocumentEvent>(),
  ...partialEvent,
  address: stubAddress(partialEvent.address),
  author: stubAuthor(partialEvent.author),
  participant: stubParticipant(partialEvent.participant),
  referencedDocument: isPropertyOverridenWithUndefined(
    partialEvent,
    'referencedDocument',
  )
    ? undefined
    : {
        ...random<DocumentReference>(),
        ...partialEvent.referencedDocument,
      },
  relatedDocument: isPropertyOverridenWithUndefined(
    partialEvent,
    'relatedDocument',
  )
    ? undefined
    : {
        ...random<DocumentReference>(),
        ...partialEvent.relatedDocument,
      },
});

export const stubDocumentEventAttachment = (
  partialInput: Partial<DocumentEventAttachment> = {},
): DocumentEventAttachment => ({
  ...random<DocumentEventAttachment>(),
  ...partialInput,
});

export const stubDocumentEventWithMetadata = (
  attributes: DocumentEventAttribute[],
): DocumentEvent =>
  stubDocumentEvent({
    metadata: {
      attributes,
    },
  });

export const stubDocumentEventAttribute = (
  partialInput: Partial<DocumentEventAttribute> = {},
): DocumentEventAttribute => ({
  ...random<DocumentEventAttribute>(),
  ...partialInput,
});

export const stubActorTypeMetadataAttribute = (
  actorType: DocumentEventActorType,
): DocumentEventAttribute => ({
  ...random<DocumentEventAttribute>(),
  name: DocumentEventAttributeName.ACTOR_TYPE,
  value: actorType,
});

export const stubActorEventWithActorType = (
  actorType: DocumentEventActorType,
  partialEvent?: PartialDeep<DocumentEvent>,
): DocumentEvent => {
  const attributes = partialEvent?.metadata?.attributes ?? [];

  return stubDocumentEvent({
    ...partialEvent,
    metadata: {
      attributes: [...attributes, stubActorTypeMetadataAttribute(actorType)],
    },
    name: DocumentEventName.ACTOR,
  });
};

export const stubDocumentEventWithReportType = (
  reportType: ReportType,
  partialEvent?: PartialDeep<DocumentEvent>,
): DocumentEvent => {
  const attributes = partialEvent?.metadata?.attributes ?? [];

  return stubDocumentEvent({
    ...partialEvent,
    metadata: {
      attributes: [
        ...attributes,
        stubDocumentEventAttribute({
          name: DocumentEventAttributeName.REPORT_TYPE,
          value: reportType,
        }),
      ],
    },
  });
};

export const stubDocumentEventWithMetadataAttributes = (
  partialEvent?: PartialDeep<DocumentEvent>,
  attributes?: Array<[DocumentEventAttributeName, DocumentEventAttributeValue]>,
) =>
  stubDocumentEvent({
    ...partialEvent,
    metadata: {
      attributes: attributes?.map((attribute) => ({
        isPublic: faker.datatype.boolean(),
        name: attribute[0],
        value: attribute[1],
      })),
    },
  });
