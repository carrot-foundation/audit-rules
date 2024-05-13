import type { UnknownArray } from 'type-fest';

import {
  type DocumentEvent,
  DocumentEventAttributeName,
  DocumentEventName,
  type PredicateCallback,
} from '@carrot-fndn/methodologies/bold/types';

import {
  eventHasMetadataAttribute,
  eventHasName,
  eventHasNonEmptyStringAttribute,
} from './event.predicates';

export const and =
  <T>(
    ...predicateCallbacks: [
      PredicateCallback<T>,
      PredicateCallback<T>,
      ...PredicateCallback<T>[],
    ]
  ): PredicateCallback<T> =>
  (input: T) =>
    predicateCallbacks.every((predicateCallback) => predicateCallback(input));

export const not =
  <T>(predicateCallback: PredicateCallback<T>) =>
  (input: T) =>
    !predicateCallback(input);

export const eventNameIsAnyOf =
  (eventNames: Array<DocumentEventName>): PredicateCallback<DocumentEvent> =>
  (event) =>
    eventNames.some((name) => eventHasName(event, name));

export const metadataAttributeNameIsAnyOf =
  (
    metadataNames: Array<DocumentEventAttributeName>,
  ): PredicateCallback<DocumentEvent> =>
  (event) =>
    metadataNames.some((metadataName) =>
      eventHasMetadataAttribute({ event, metadataName }),
    );

export const metadataAttributeValueIsAnyOf =
  (
    metadataName: DocumentEventAttributeName,
    metadataValues: UnknownArray,
  ): PredicateCallback<DocumentEvent> =>
  (event) =>
    eventHasMetadataAttribute({ event, metadataName, metadataValues });

export const metadataAttributeValueIsNotEmpty =
  (
    metadataName: DocumentEventAttributeName,
  ): PredicateCallback<DocumentEvent> =>
  (event) =>
    eventHasNonEmptyStringAttribute(event, metadataName);
