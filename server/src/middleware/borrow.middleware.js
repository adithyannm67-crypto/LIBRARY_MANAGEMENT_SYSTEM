export function borrowAuth1(borrowlimit, borrowed) {
  if (borrowed < borrowlimit) {
    return true;
  } else {
    return false;
  }
}

export function borrowAuth2(availablecopies) {
  if (availablecopies>0) {
    return true;
  } else {
    return false;
  }
}
