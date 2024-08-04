function chooseConvert(data: string[]) {
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

function smileConvert(number: number) {
  if (number === 1) {
    return 'Not at all';
  }
  if (number === 2) {
    return 'A little disliked';
  }
  if (number === 3) {
    return 'Neutral';
  }
  if (number === 4) {
    return "It's a little weird";
  }
  if (number === 5) {
    return 'Absolutely like';
  }
}

export function convertData(reqData: {
  name: string;
  first: number[];
  second: string[];
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
  seventh: string;
}) {
  const convert = chooseConvert(reqData.second);
  return {
    answers: {
      ord_T_q_9101a_3: smileConvert(reqData.first[0]),
      ord_T_q_9101a_4: smileConvert(reqData.first[1]),
      ord_T_q_9101a_5: smileConvert(reqData.first[2]),
      ord_T_q_9101a_7: smileConvert(reqData.first[3]),
      ord_T_q_9101a_8: smileConvert(reqData.first[4]),
      ord_T_q_9101b_1: smileConvert(reqData.first[5]),
      ord_T_q_9101b_2: smileConvert(reqData.first[6]),
      ord_T_q_9101b_3: smileConvert(reqData.first[7]),
      ord_T_q_9101b_4: smileConvert(reqData.first[8]),
      ord_T_q_9101b_6: smileConvert(reqData.first[9]),
      ord_T_q_9101b_7: smileConvert(reqData.first[10]),
      ord_T_q_9101c_1: smileConvert(reqData.first[11]),
      ord_T_q_9101c_2: smileConvert(reqData.first[12]),
      ord_T_q_9101c_4: smileConvert(reqData.first[13]),
      ord_T_q_9101c_6: smileConvert(reqData.first[14]),
      ord_T_q_9101c_7: smileConvert(reqData.first[15]),
      ord_T_q_9101c_8: smileConvert(reqData.first[16]),
      ord_T_q_9101c_9: smileConvert(reqData.first[17]),
      ord_T_q_9101d_2: smileConvert(reqData.first[18]),
      ord_T_q_9101d_3: smileConvert(reqData.first[19]),
      ord_T_q_9101d_4: smileConvert(reqData.first[20]),
      ord_T_q_9101d_6: smileConvert(reqData.first[21]),
      ord_T_q_9101d_7: smileConvert(reqData.first[22]),
      ord_T_q_9101d_8: smileConvert(reqData.first[23]),
      ord_T_q_9101d_9: smileConvert(reqData.first[24]),
      ord_T_q_9101e_1: smileConvert(reqData.first[25]),
      ord_T_q_9101e_2: smileConvert(reqData.first[26]),
      ord_T_q_9101e_4: smileConvert(reqData.first[27]),
      ord_T_q_9101e_7: smileConvert(reqData.first[28]),
      ord_T_q_9101e_8: smileConvert(reqData.first[29]),
      ord_T_q_9101f_2: smileConvert(reqData.first[30]),
      ord_q_9301: reqData.third,
      nom_q_1102: 'Man',
      nom_q_1111: 'Dushanbe',
      nom_q_1110: 'City',
      nom_q_9103b: convert[0],
      nom_q_9103c: convert[1],
      nom_q_9103d: convert[2],
      nom_q_9103e: convert[3],
      nom_q_9103f: convert[4],
      nom_q_9103g: convert[5],
      nom_q_9103h: convert[6],
      nom_q_9103i: convert[7],
      nom_q_9103j: convert[8],
      nom_q_9103k: convert[9],
      nom_q_9103l: convert[10],
      nom_q_9103m: convert[11],
      nom_q_9103n: convert[12],
      nom_q_9103o: convert[13],
      nom_q_9103p: convert[14],
      nom_q_9103q: convert[15],
      nom_q_9103r: convert[16],
      nom_q_9103s: convert[17],
      nom_q_9303: reqData.fourth,
      nom_q_9305: reqData.fifth,
      nom_q_9306: reqData.sixth,
      nom_q_9308: reqData.seventh,
    },
  };
}
