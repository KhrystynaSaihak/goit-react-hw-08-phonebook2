import { createSelector } from '@reduxjs/toolkit';

export const selectFilter = state => state.contacts.filter;
export const selectItems = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;


export const selectedContacts = createSelector(
  [selectItems, selectFilter],
  (items, filter) => {
    const filteredContacts = items.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return filteredContacts;
  }
);
