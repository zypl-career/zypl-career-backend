export function chooseConvert(data: string[]) {
  const newArray = [];
  for (let i = 0; i < data.length; i++) {
    // 1
    if (data[i] === 'Chemistry' || data[i] === 'Electronics') {
      newArray[0] = data[i];
    }
    // 2
    if (data[i] === 'Photography' || data[i] === 'Botany') {
      newArray[1] = data[i];
    }
    // 3
    if (data[i] === 'Advice on work' || data[i] === 'Owning a store') {
      newArray[2] = data[i];
    }
    // 4
    if (
      data[i] === 'Helping families in need' ||
      data[i] === 'Company management'
    ) {
      newArray[3] = data[i];
    }
    // 5
    if (data[i] === 'Physical training' || data[i] === 'Doktor') {
      newArray[4] = data[i];
    }
    // 6
    if (data[i] === 'Music' || data[i] === 'Working with wood') {
      newArray[5] = data[i];
    }
    // 7
    if (data[i] === 'Economic sciences' || data[i] === 'Physics') {
      newArray[6] = data[i];
    }
    // 8
    if (data[i] === 'Education' || data[i] === 'Art') {
      newArray[7] = data[i];
    }
    // 9
    if (data[i] === 'Law' || data[i] === 'Artist / Folk Crafts') {
      newArray[8] = data[i];
    }
    // 10
    if (data[i] === 'Child care' || data[i] === 'Stand electronics') {
      newArray[9] = data[i];
    }
    // 11
    if (
      data[i] === 'Playing in a group, being a member of a music team' ||
      data[i] === 'Landscaping'
    ) {
      newArray[10] = data[i];
    }
    // 12
    if (data[i] === 'Travel agent' || data[i] === 'Mechanic') {
      newArray[11] = data[i];
    }
    // 13
    if (data[i] === 'Work in the office' || data[i] === 'Picture description') {
      newArray[12] = data[i];
    }
    // 14
    if (data[i] === 'Forest' || data[i] === 'The nurse of mercy') {
      newArray[13] = data[i];
    }
    // 15
    if (data[i] === 'Economist' || data[i] === 'Electric') {
      newArray[14] = data[i];
    }
    // 16
    if (data[i] === 'Accounting' || data[i] === 'Geology') {
      newArray[15] = data[i];
    }
    // 17
    if (data[i] === 'Builder' || data[i] === 'Economist') {
      newArray[16] = data[i];
    }
    // 18
    if (
      data[i] === 'Confirmation of a home loan (mortgage)' ||
      data[i] === 'Helping patients in the hospital'
    ) {
      newArray[17] = data[i];
    }
  }

  return newArray;
}
