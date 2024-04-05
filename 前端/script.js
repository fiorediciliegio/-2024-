function createProject() {
    // 获取用户输入的信息
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
  
    // 创建包含用户输入信息的JavaScript对象
    var projectData = {
      name: name,
      number:number,
      description: description
    };
  
    // 将JavaScript对象转换为JSON格式字符串
    var jsonData = JSON.stringify(projectData);
  
    // 发送HTTP POST请求到后端
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '后端URL', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 请求成功的处理代码
        console.log('项目创建成功');
      } else {
        // 请求失败的处理代码
        console.error('项目创建失败');
      }
    };
    xhr.send(jsonData);
  }
  