class TreasureHuntGame {
    constructor() {
      this.gridSize = 5; // 5x5网格
      this.playerPosition = { x: 0, y: 0 }; // 玩家初始位置
      this.libraryPosition = this.generateRandomPosition(); // 图书馆位置
      this.treasurePosition = this.generateRandomPosition(); // 神庙位置
      this.decodePosition = this.generateRandomPosition(); // 生成解码位置
      this.gameOver = false;
      this.hasFoundLibrary = false; // 标记玩家是否找到了图书馆
      this.hasDecoded = false; // 标记玩家是否解码
    }
  
    // 随机生成一个位置
    generateRandomPosition() {
      let x = Math.floor(Math.random() * this.gridSize);
      let y = Math.floor(Math.random() * this.gridSize);
      return { x, y };
    }
  
    // 更新玩家的状态
    movePlayer(direction) {
      if (this.gameOver) return;
  
      switch (direction) {
        case 'up':
          if (this.playerPosition.y > 0) this.playerPosition.y--;
          break;
        case 'down':
          if (this.playerPosition.y < this.gridSize - 1) this.playerPosition.y++;
          break;
        case 'left':
          if (this.playerPosition.x > 0) this.playerPosition.x--;
          break;
        case 'right':
          if (this.playerPosition.x < this.gridSize - 1) this.playerPosition.x++;
          break;
      }
  
      this.checkForEvents(); // 检查是否触发事件
      this.renderMap(); // 更新地图显示
    }
  
    // 检查是否触发了图书馆或神庙事件
    checkForEvents() {
      // 碰到图书馆
      if (
        this.playerPosition.x === this.libraryPosition.x &&
        this.playerPosition.y === this.libraryPosition.y &&
        !this.hasFoundLibrary
      ) {
        this.hasFoundLibrary = true;
        document.getElementById('status').textContent = '在古老的图书馆里找到了第一个线索!';
      }
      // 碰到解码位置
      else if (
        this.playerPosition.x === this.decodePosition.x &&
        this.playerPosition.y === this.decodePosition.y 
      ) {
        if(this.hasFoundLibrary){
            document.getElementById('status').textContent = '解码成功! 宝藏在一座古老的神庙中...';}     
        else {
            document.getElementById('status').textContent = '没有线索可以解码!';
        }
            
        
      }
      // 碰到神庙
      else if (this.playerPosition.x === this.treasurePosition.x && this.playerPosition.y === this.treasurePosition.y) {
          // 神庙事件触发
          let randomChance = Math.random();
          if (randomChance < 0.5) {
            document.getElementById('status').textContent = '糟糕! 遇到了神庙守卫!';
            document.getElementById('restartButton').style.display = 'block'; // 显示重新开始按钮
            this.gameOver = true;
          } else {
            document.getElementById('status').textContent = '找到了一个神秘的箱子...';
            // 如果解码成功并到达神庙，结束游戏
            if (this.hasDecoded && this.playerPosition.x === this.treasurePosition.x && this.playerPosition.y === this.treasurePosition.y) {
             document.getElementById('status').textContent = '恭喜! 你找到了传说中的宝藏!';
             this.gameOver = true;
             document.getElementById('restartButton').style.display = 'block'; // 显示重新开始按钮
      }
          }
        } 
      
    }
  
    // 渲染地图
    renderMap() {
      const mapElement = document.getElementById('map');
      mapElement.innerHTML = ''; // 清空之前的地图
  
      for (let y = 0; y < this.gridSize; y++) {
        for (let x = 0; x < this.gridSize; x++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
  
          // 如果是玩家位置，添加 "player" 类
          if (this.playerPosition.x === x && this.playerPosition.y === y) {
            cell.classList.add('player');
            cell.textContent = '玩家';
          }
  
          // 如果是图书馆位置，添加 "library" 类
          if (this.libraryPosition.x === x && this.libraryPosition.y === y) {
            cell.classList.add('library');
            cell.textContent = '图书馆';
          }
  
          // 如果是神庙位置，添加 "treasure" 类
          if (this.treasurePosition.x === x && this.treasurePosition.y === y) {
            cell.classList.add('treasure');
            cell.textContent = '神庙';
          }
  
          // 如果是解码位置，添加 "decode" 类
          if (this.decodePosition && this.decodePosition.x === x && this.decodePosition.y === y) {
            cell.classList.add('decode');
            cell.textContent = '解码';
          }
  
          mapElement.appendChild(cell);
        }
      }
    }
  }
  
  // 游戏初始化
  let game;
  
  function startGame() {
    // 隐藏开始按钮并显示游戏界面
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('gameInterface').style.display = 'block';
    
    // 创建游戏对象并渲染地图
    game = new TreasureHuntGame();
    game.renderMap();
    
    // 监听键盘事件
    document.addEventListener('keydown', (e) => {
      if (game.gameOver) return;
  
      switch (e.key) {
        case 'ArrowUp':
          game.movePlayer('up');
          break;
        case 'ArrowDown':
          game.movePlayer('down');
          break;
        case 'ArrowLeft':
          game.movePlayer('left');
          break;
        case 'ArrowRight':
          game.movePlayer('right');
          break;
      }
    });
  }
  
  // 重新开始游戏
  document.getElementById('startButton').addEventListener('click', startGame);
  
  // 重新开始游戏按钮事件
  document.getElementById('restartButton').addEventListener('click', () => {
    window.location.reload();
  });
  