import { atomWithStorage } from 'jotai/utils';

export const isLogAtom = atomWithStorage('isLog', false );

export const currentUserNameAtom = atomWithStorage('userName',null);
export const currentUserMailAtom = atomWithStorage('userMail',null);