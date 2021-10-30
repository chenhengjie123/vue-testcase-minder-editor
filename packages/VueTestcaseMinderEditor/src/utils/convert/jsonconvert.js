/************************************************
 *  解析json格式转换为km文件
 * @param node
 * @returns {*}
 */

const NODE_DATA_KEY =  [
  'id',
  'text',
  'note',
  'progress',
  'priority',
  'hyperlinkTitle',
  'hyperlink',
  'testResult',
  'auto',
  'resource',
  'leafNode',
  'createTime',
  'createUser',
  'updateUser',
  'updateTime',
  'storyId',
  'storyNo'
  // 'created',
  // 'updated'
];

function traverseJson2(node) {
  if (!node) {
    return;
  }
  let data = node.data
  node.data = concatNodes2(data);
  if (node.children && node.children.length > 0) {
    for (var i = 0; i < node.children.length; i++) {
      node.children[i] = traverseJson2(node.children[i]);
    }
  }
  return node;
}

function concatNodes2(data) {
  const { hyberlinks, progress, priority, note, presentationJson, ...restData } = data;

  const result = {
    ...restData
  };

  if (hyberlinks.link) {
    result['hyperlink'] = hyberlinks.link
  }
  if (hyberlinks.title) {
    result['hyperlinkTitle'] = hyberlinks.title
  }
  if (progress) {
    result.progress = progress;
  }
  if (priority) {
    result.priority = priority;
  }
  if (note) {
    result.note = note;
  }
  if(presentationJson){
    try{
      const obj = JSON.parse(presentationJson)
      return Object.assign(result, obj);
    }catch (e) {
      console.warn(e);
      return result;
    }
  }
  return result;
}

function jsonToKm(fmind) {
  fmind.root = traverseJson2(fmind.root);
  fmind['version'] = fmind['mapVersion']
  delete fmind['mapVersion']
  delete fmind['name']
  delete fmind['spaceId']
  delete fmind['createUser']
  return fmind;
}

/************************************************
 *  解析km文件转换为存储json格式
 *  转为存储格式
 * @param node
 * @returns {*}
 */
function traverseJson(node) {
  if (!node) {
    return;
  }
  let data = node.data;
  node.data = concatNodes(data);
  if (node.children && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      node.children[i] = traverseJson(node.children[i]);
    }
  }
  return node;
}

function concatNodes(datas) {
  let result = {};
  const { hyperlinkTitle, hyperlink, } = datas;
  const keyList = NODE_DATA_KEY;
  result.hyberlinks = {'link': '', 'title': ''};
  for (let key of keyList) {
    if (Object.prototype.hasOwnProperty.call(datas, key) && key === 'hyperlinkTitle') {
      result.hyberlinks.title = hyperlinkTitle;
      delete datas[key]
    } else if (Object.prototype.hasOwnProperty.call(datas, key) && key === 'hyperlink') {
      result.hyberlinks.link = hyperlink;
      delete datas[key]
    } else if (Object.prototype.hasOwnProperty.call(datas, key) && key === 'id') {
      if (typeof(map.get(datas[key])) == "undefined") {
        result[key] = datas[key];
        map.set(datas[key], 1);
        delete datas[key]
      } else {
        let tmpId = GenerationId();
        result[key]= tmpId;
        map.set(tmpId, 1);
        delete datas[key]
      }
    }else if (Object.prototype.hasOwnProperty.call(datas, key)) {
      result[key] = datas[key]
      delete datas[key]
    } else if (key === 'progress') {
      result[key] = null
    } else if (key === 'priority') {
      result[key] = null
    } else if (key === '') {
      result[key] = null
    } else if (key === 'auto') {
      result[key] = null
    } else if (key === 'note') {
      result[key] = ''
    }
  }
  let tmp = JSON.stringify(datas)
  if (tmp === "{}") {
    result.presentationJson = '';
  } else {
    result.presentationJson = tmp;
  }
  return result;
}

var map;

function kmToJson(tmind) {
  tmind['mapVersion'] = String(tmind['version']);
  delete tmind['version'];
  map = new Map();
  tmind.root = traverseJson(tmind.root);
  map = null;
  return tmind;
}

function GenerationId() {
  let newId = (new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
  if (typeof(map.get(newId)) == "undefined") {
    map.set(newId, 1);
    return newId;
  } else {
    sleep(5);
    newId = (new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
    map.set(newId, 1);
    return newId;
  }
}


function sleep(time) {
  let start = new Date();
  let end = start + time;
  while (true) { //eslint-disable-line
    if (end > start) {
      break;
    }
  }
}

/************************************************
 *  脑图json文件拷贝处理
 * @param node
 * @returns {*}
 */
function traverseJson3(node) {
  if (!node) {
    return;
  }
  node.data = concatNodes3(node.data);
  if (node.children && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      node.children[i] = traverseJson3(node.children[i]);
    }
  }
  return node;
}

function concatNodes3(datas) {
  datas.id = (new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
  datas.created = +new Date();
  return datas;
}

function copyJson(fmind) {
  fmind.root = traverseJson3(fmind.root);
  delete fmind['name']
  delete fmind['spaceId']
  delete fmind['createUser']
  return fmind;
}

/**
 * 如果自身是expend，将所有父级、爷爷级等设置为expend
 */

function expandParent(data) {
  if (data.children.length !== 0) {
    data.children.forEach(item => {
      item.parent = data;
      let parent = item.parent;
      if (item.data.expandState === 'expand') {
        while (parent && parent.data.expandState !== 'expand') {
          parent.data.expandState = 'expand'
          parent = parent.parent
        }
      }
      expandParent(item);
    });
    return data;
  }
}

export {
  kmToJson,
  jsonToKm,
  copyJson,
  expandParent
}
