const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.5;
let isCheckpointCollisionDetectionActive = true;

/*let lastCheckpoint = {
  x: proportionalSize(10),
  y: proportionalSize(400),
}*/

const proportionalSize = (size) => {
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}

class Player {
  constructor() {
    this.position = {
      x: proportionalSize(10),
      y: proportionalSize(400),
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(40);

    this.image = new Image();
    this.image.src = "Jumpy Cat pic 1.JPG"
  }
  draw() {
    //ctx.fillStyle = "#99c9ff";
    //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    if (this.image.complete) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    } else {
      ctx.fillStyle = "#99c9ff";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
  
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = gravity;
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }

    if (this.position.x < this.width) {
      this.position.x = this.width;
    }

    if (this.position.x >= canvas.width - this.width * 2) {
      this.position.x = canvas.width - this.width * 2;
    }
  }
}

class Platform {
  constructor(x, y) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = proportionalSize(40);
  }
  draw() {
    ctx.fillStyle = "#acd157";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

/*
class CheckPoint {
  constructor(x, y, z) {
    this.position = {
      x,
      y,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(70);
    this.claimed = false;
  };

  draw() {
    ctx.fillStyle = "#f1be32";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
    this.claimed = true;
  }
  //reset checkpoint code
  reset() {
    this.claimed = false;
    this.position = { ...this.originalPosition }; // Reset to original position
    this.width = proportionalSize(40);
    this.height = proportionalSize(70);
  }
};
*/
//new checkpoint code
class CheckPoint {
  constructor(x, y) {
    this.originalPosition = { x, y }; 
    this.position = { ...this.originalPosition }; 
    this.width = proportionalSize(40);
    this.height = proportionalSize(70);
    this.claimed = false;
  }

  draw() {
    ctx.fillStyle = this.claimed ? "#aaaaaa" : "#f1be32"; // Gray not showing up yet
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  claim() {
    this.claimed = true;
    this.width = 0; 
    this.height = 0;
    this.position = { x: -Infinity, y: -Infinity }; 
  }

  reset() {
    this.claimed = false; 
    this.position = { ...this.originalPosition }; 
    this.width = proportionalSize(40); 
    this.height = proportionalSize(70); 
  }
}


const player = new Player();

const platformPositions = [
  { x: 25, y: proportionalSize(500) },
  { x: 500, y: proportionalSize(450) },
  { x: 700, y: proportionalSize(400) },
  { x: 850, y: proportionalSize(350) },
  { x: 900, y: proportionalSize(350) },
  { x: 1050, y: proportionalSize(150) },
  { x: 2500, y: proportionalSize(450) },
  { x: 2900, y: proportionalSize(400) },
  { x: 3150, y: proportionalSize(350) },
  { x: 3900, y: proportionalSize(450) },
  { x: 4200, y: proportionalSize(400) },
  { x: 4400, y: proportionalSize(200) },
  { x: 4700, y: proportionalSize(150) },
  { x: 4900, y: proportionalSize(350) },
  { x: 5200, y: proportionalSize(350) },
  { x: 5550, y: proportionalSize(450) },
  { x: 5700, y: proportionalSize(400) },
  { x: 5950, y: proportionalSize(200) },
  { x: 6100, y: proportionalSize(150) },
  { x: 6400, y: proportionalSize(200) },
  { x: 6600, y: proportionalSize(350) },
  { x: 6950, y: proportionalSize(450) },
  { x: 7100, y: proportionalSize(250) },
  { x: 7300, y: proportionalSize(150) },
  { x: 7650, y: proportionalSize(350) },
  { x: 7900, y: proportionalSize(450) },
  { x: 8200, y: proportionalSize(200) },
  { x: 8500, y: proportionalSize(450) },
  { x: 8750, y: proportionalSize(200) },
  { x: 8900, y: proportionalSize(450) },
  { x: 9200, y: proportionalSize(450) },
  { x: 9550, y: proportionalSize(300) },
  { x: 9700, y: proportionalSize(150) },
  { x: 9950, y: proportionalSize(400) },
  { x: 10100, y: proportionalSize(150) },
  { x: 10450, y: proportionalSize(350) },
  { x: 10900, y: proportionalSize(200) },
  { x: 11150, y: proportionalSize(450) },
  { x: 11500, y: proportionalSize(300) },
  { x: 11900, y: proportionalSize(100) },
  { x: 12300, y: proportionalSize(350) },
  { x: 12750, y: proportionalSize(450) },
  { x: 13000, y: proportionalSize(250) },
  { x: 13350, y: proportionalSize(150) },
  { x: 13600, y: proportionalSize(250) },
  { x: 13950, y: proportionalSize(450) },
  { x: 14250, y: proportionalSize(150) },
  { x: 14750, y: proportionalSize(150) },
  { x: 15100, y: proportionalSize(300) },
  { x: 15550, y: proportionalSize(150) },
  { x: 15900, y: proportionalSize(350) },
  { x: 16250, y: proportionalSize(150) },
  { x: 16750, y: proportionalSize(450) },
  { x: 17000, y: proportionalSize(250) },
  { x: 17450, y: proportionalSize(100) },
  { x: 17900, y: proportionalSize(250) },
  { x: 18250, y: proportionalSize(350) },
  { x: 18700, y: proportionalSize(150) },
  { x: 19250, y: proportionalSize(100) },
  { x: 19600, y: proportionalSize(450) },
  { x: 20000, y: proportionalSize(300) },
  { x: 20300, y: proportionalSize(100) },
  { x: 20750, y: proportionalSize(150) },
  { x: 21100, y: proportionalSize(250) },
  { x: 21500, y: proportionalSize(300) },
  { x: 21900, y: proportionalSize(450) },
  { x: 22300, y: proportionalSize(250) },
  { x: 22750, y: proportionalSize(400) },
  { x: 23000, y: proportionalSize(300) },
  { x: 23450, y: proportionalSize(200) },
  { x: 23800, y: proportionalSize(250) },
  { x: 24100, y: proportionalSize(150) },
  { x: 24350, y: proportionalSize(250) },
  { x: 24900, y: proportionalSize(300) },
  { x: 25300, y: proportionalSize(450) },
  { x: 25750, y: proportionalSize(150) },
  { x: 26100, y: proportionalSize(300) },
  { x: 26700, y: proportionalSize(200) },
  { x: 27100, y: proportionalSize(150) },
];

const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

const checkpointPositions = [
  { x: 1170, y: proportionalSize(80), z: 1 },
  { x: 2900, y: proportionalSize(330), z: 2 },
  { x: 4800, y: proportionalSize(80), z: 3 },
  { x: 6400, y: proportionalSize(130), z: 4 },
  { x: 7900, y: proportionalSize(380), z: 5 },
  { x: 9550, y: proportionalSize(230), z: 6 },
  { x: 11150, y: proportionalSize(380), z: 7 },
  { x: 15100, y: proportionalSize(230), z: 8 },
  { x: 20000, y: proportionalSize(230), z: 9 },
  { x: 26100, y: proportionalSize(230), z: 10 }
];

const checkpoints = checkpointPositions.map(
  (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
);

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((platform) => {
    platform.draw();
  });

  checkpoints.forEach(checkpoint => {
    checkpoint.draw();
  });

  player.update();

  playerDied();

  if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
    player.velocity.x = 5;
  } else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });

      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x -= 5;
      });
    
    } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });

      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x += 5;
      });
    }
  }

  platforms.forEach((platform) => {
    const collisionDetectionRules = [
      player.position.y + player.height <= platform.position.y,
      player.position.y + player.height + player.velocity.y >= platform.position.y,
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3, 
    ];

    if (collisionDetectionRules.every((rule) => rule)) {
      player.velocity.y = 0;
      return;
    }

    const platformDetectionRules = [
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
      player.position.y + player.height >= platform.position.y,
      player.position.y <= platform.position.y + platform.height,
    ];

    if (platformDetectionRules.every(rule => rule)) {
      player.position.y = platform.position.y + player.height;
      player.velocity.y = gravity;
    };
  });

  checkpoints.forEach((checkpoint, index, checkpoints) => {
    const checkpointDetectionRules = [
      player.position.x >= checkpoint.position.x,
      player.position.y >= checkpoint.position.y,
      player.position.y + player.height <=
        checkpoint.position.y + checkpoint.height,
      isCheckpointCollisionDetectionActive,
      player.position.x - player.width <=
        checkpoint.position.x - checkpoint.width + player.width * 0.9,
      index === 0 || checkpoints[index - 1].claimed === true,
    ];

    if (checkpointDetectionRules.every((rule) => rule)) {
      checkpoint.claim();
      //lastCheckpoint = { x: checkpoint.position.x, y: checkpoint.position.y};


      if (index === checkpoints.length - 1) {
        isCheckpointCollisionDetectionActive = false;
        showCheckpointScreen("You reached the final checkpoint!");
        movePlayer("ArrowRight", 0, false);
      } else if (player.position.x >= checkpoint.position.x && player.position.x <= checkpoint.position.x + 40) {
        showCheckpointScreen("You reached a checkpoint!")
      }


    };
});
}


const playerDied = () => {
  if (player.position.y + player.height >= canvas.height) {
    player.position = { 
      x: proportionalSize(10), 
      y: proportionalSize(400), 
    };
    player.velocity = {
      x: 0,
      y: 0,
    }
    // Reset all platforms
    platforms.forEach((platform, index) => {
      platform.position = { ...platformPositions[index] };
    });

    // Reset all checkpoints
    checkpoints.forEach((checkpoint) => {
      checkpoint.reset();
    });

    // Re-enable checkpoint collision detection
    isCheckpointCollisionDetectionActive = true;
  }
};


const keys = {
rightKey: {
  pressed: false
},
leftKey: {
  pressed: false
}
};

const movePlayer = (key, xVelocity, isPressed) => {
if (!isCheckpointCollisionDetectionActive) {
  player.velocity.x = 0;
  player.velocity.y = 0;
  return;
}

switch (key) {
  case "ArrowLeft":
    keys.leftKey.pressed = isPressed;
    if (xVelocity === 0) {
      player.velocity.x = xVelocity;
    }
    player.velocity.x -= xVelocity;
    break;
  case "ArrowUp":
  case " ":
  case "Spacebar":
    player.velocity.y -= 8;  // original player.velocity.y -= 8
    break;
  case "ArrowRight":
    keys.rightKey.pressed = isPressed;
    if (xVelocity === 0) {
      player.velocity.x = xVelocity;
    }
    player.velocity.x += xVelocity;
}
}

const startGame = () => {
canvas.style.display = "block";
startScreen.style.display = "none";
animate();
}

const showCheckpointScreen = (msg) => {
checkpointScreen.style.display = "block";
checkpointMessage.textContent = msg;
if (isCheckpointCollisionDetectionActive) {
  setTimeout(() => (checkpointScreen.style.display = "none"), 2000);
}
};

startBtn.addEventListener("click", startGame);

window.addEventListener("keydown", ({ key }) => {
movePlayer(key, 8, true);
});

window.addEventListener("keyup", ({ key }) => {
movePlayer(key, 0, false);
});
