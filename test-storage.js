// 测试数据存储功能
import { saveChecklist, loadChecklist, clearAllData } from './src/utils/storage';
import { CHECKLIST_TYPES, DEFAULT_CHECKLISTS } from './src/constants/checklistData';

const testData = async () => {
  console.log('开始测试数据存储功能...\n');

  // 测试保存数据
  console.log('1. 测试保存数据');
  const dayTripData = DEFAULT_CHECKLISTS[CHECKLIST_TYPES.DAY_TRIP];
  const saveResult = await saveChecklist(CHECKLIST_TYPES.DAY_TRIP, dayTripData);
  console.log('保存一日游清单:', saveResult ? '成功' : '失败');

  // 测试加载数据
  console.log('\n2. 测试加载数据');
  const loadedData = await loadChecklist(CHECKLIST_TYPES.DAY_TRIP);
  console.log('加载一日游清单:', loadedData ? '成功' : '失败');
  if (loadedData) {
    console.log('清单项数量:', loadedData.length);
    console.log('第一项:', loadedData[0]);
  }

  // 测试更新数据
  console.log('\n3. 测试更新数据');
  const updatedData = [...loadedData];
  updatedData[0].completed = true;
  const updateResult = await saveChecklist(CHECKLIST_TYPES.DAY_TRIP, updatedData);
  console.log('更新清单:', updateResult ? '成功' : '失败');
  const reloadedData = await loadChecklist(CHECKLIST_TYPES.DAY_TRIP);
  console.log('更新后第一项状态:', reloadedData[0].completed ? '已完成' : '未完成');

  // 测试清空数据
  console.log('\n4. 测试清空数据');
  const clearResult = await clearAllData();
  console.log('清空所有数据:', clearResult ? '成功' : '失败');
  const clearedData = await loadChecklist(CHECKLIST_TYPES.DAY_TRIP);
  console.log('清空后的数据:', clearedData);

  console.log('\n测试完成！');
};

// 运行测试
testData().catch(console.error);
