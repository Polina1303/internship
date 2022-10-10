const plan = [
    "############################",
    "# ~    #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################",
  ];
  
  function elementFromChar(legend, ch) {
    if (ch == " ") return null;
    const element = new legend[ch]();
    element.originChar = ch;
    return element;
  }
  
  function charFromElement(element) {
    if (element == null) return " ";
    else return element.originChar;
  }
  
  function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    plus(vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    }
  }
  const directions = {
    n: new Vector(0, -1),
    ne: new Vector(1, -1),
    e: new Vector(1, 0),
    se: new Vector(1, 1),
    s: new Vector(0, 1),
    sw: new Vector(-1, 1),
    w: new Vector(-1, 0),
    nw: new Vector(-1, -1),
  };
  
  const directionNames = "n ne e se s sw w nw".split(" ");
  
  class Grid {
    constructor(width, height) {
      this.space = new Array(width * height);
      this.width = width;
      this.height = height;
    }
    isInside(vector) {
      return (
        vector.x > 0 &&
        vector.x < this.width &&
        vector.y > 0 &&
        vector.y < this.height
      );
    }
    get(vector) {
      return this.space[vector.x + this.width * vector.y];
    }
    set(vector, value) {
      return (this.space[vector.x + this.width * vector.y] = value);
    }
    forEach(f, context) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let value = this.space[x + y * this.width];
          if (value != null) f.call(context, value, new Vector(x, y));
        }
      }
    }
  }
  
  function Wall() {}
  
  class BouncingCritter {
    constructor() {
      this.direction = randomElement(directionNames);
    }
    act(view) {
      if (view.look(this.direction) != " ")
        this.direction = view.find(" ") || "s";
      return { type: "move", direction: this.direction };
    }
  }
  
  class GameInfo{
    constructor(world){
      this.world = world
    this.container = null
    }
    update(){
      const { legend, grid } = this.world
      let stats = {}
      for (let critter in legend) {
        stats[critter] = 0
      }
      grid.forEach(function (...rest) {
        const critter = rest[0]
        if (stats.hasOwnProperty(critter.originChar)) {
          stats[critter.originChar] += 1
        }
      }, null)
      if (!this.container) {
        this.container = document.getElementById('game__info')
      }
      if (this.container) {
        let inner = ''
        for (let key in stats) {
          inner += `<li>${key} : ${stats[key]}</li>`
        }
        this.container.innerHTML = `
          <ul>
            ${inner}
          </ul>
        `
      }
    }
  }
  
  class World {
    constructor(map, legend) {
      this.grid = new Grid(map[0].length, map.length);
      this.legend = legend;
      this.gameInfo = new GameInfo(this)
  
      map.forEach((line, y) => {
        for (let x = 0; x < line.length; x++)
          this.grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
      });
    }
  
    turn() {
      const acted = [];
      this.grid.forEach((critter, vector) => {
        if (critter.act && acted.indexOf(critter) === -1) {
          acted.push(critter);
          this.letAct(critter, vector);
        }
      });
    }
  
    letAct(critter, vector) {
      let action = critter.act(new View(this, vector));
      if (action && action.type === "move") {
        const dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest)===null) {
          this.grid.set(dest, critter);
          this.grid.set(vector, null);
        }
      }
    }
  
    checkDestination(action, vector) {
      if (directions.hasOwnProperty(action.direction)) {
        const dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest)) return dest;
      }
    }
  
    toString() {
      let output = "";
      for (let y = 0; y < this.grid.height; y++) {
        for (let x = 0; x < this.grid.width; x++) {
          const element = this.grid.get(new Vector(x, y));
          output += charFromElement(element);
        }
        output += "\n";
      }
      this.gameInfo.update()
      return output;
    }
  }
  
  class View {
    constructor(world, vector) {
      this.world = world;
      this.vector = vector;
    }
    look(dir) {
      const target = this.vector.plus(directions[dir])
      if (this.world.grid.isInside(target)) {
        return charFromElement(this.world.grid.get(target));
      }
      return "#";
    }
    findAll(ch) {
      let found = [];
      for (let dir in directions) 
        if (this.look(dir) === ch) 
          found.push(dir);
      return found; 
    }
    find(ch) {
      const found = this.findAll(ch);
      if (!found.length) return null;
      return randomElement(found);
    }
  }
  
  function dirPlus(dir, n) {
    const index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8]; 
  }
  
  class WallFollower {
    constructor(dir) {
      this.dir = "s";
    }
    act(view) {
      let start = this.dir;
      if (view.look(dirPlus(this.dir, -3)) != " ")
        start = this.dir = dirPlus(this.dir, -2);
      while (view.look(this.dir) != " ") {
        this.dir = dirPlus(this.dir, 1);
        if (this.dir == start) break;
      }
      return { type: "move", direction: this.dir };
    }
  }
  
  class LifelikeWorld extends World {
    constructor(map, legend) {
      super(map, legend);
    }
    letAct(critter, vector) {
      const action = critter.act(new View(this, vector));
      let handled =action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action)
      if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0) {
          this.grid.set(vector, null);
        }
      }
    }
  }
  
  let actionTypes = Object.create(null);
  
  actionTypes.grow = function (critter) {
    critter.energy += 0.5;
    return true;
  };
  
  actionTypes.move = function (critter, vector, action) {
    const dest = this.checkDestination(action, vector)
    if (dest == null ||
      critter.energy <= 1 ||
      this.grid.get(dest) != null) {
      return false
    }
    critter.energy -= 1
    this.grid.set(vector, null)
    this.grid.set(dest, critter)
    return true
  };
  
  actionTypes.eat = function (critter, vector, action) {
    const dest = this.checkDestination(action, vector);
    const atDest = dest != null && this.grid.get(dest);
    if (!atDest || atDest.energy == null) {
      return false;
    }
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
  };
  
  actionTypes.reproduce = function (critter, vector, action) {
    const baby = elementFromChar(this.legend, critter.originChar);
    const dest = this.checkDestination(action, vector);
    if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null) {
      return false;
    }
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
  };
  
  class Plant {
    constructor() {
      this.energy = 3 + Math.random() * 4;
    }
    act(context) {
      if (this.energy > 15) {
        const space = context.find(" ");
        if (space) {
          return { type: "reproduce", direction: space };
        }
      }
      if (this.energy < 20) {
        return { type: "grow" };
      }
    }
  }
  
  class PlantEater {
    constructor(energy) {
      this.energy = 20;
    }
    act(context) {
      const space = context.find(" ");
      if (this.energy > 60 && space) {
        return { type: "reproduce", direction: space };
      }
      const plant = context.find("*");
      if (plant) {
        return { type: "eat", direction: plant };
      }
      if (space) {
        return { type: "move", direction: space };
      }
    }
  }
  
  const world = new World(plan, {
    "#": Wall,
    o: BouncingCritter,
    "~": WallFollower,
  });
  
  class BetterPlantEater {
    constructor() {
      this.energy = 30;
      this.direction = randomElement(directionNames);
    }
    act(context) {
      const space = context.find(" ");
      if (this.energy > 90 && space) {
        return { type: "reproduce", direction: space };
      }
      const plants = context.findAll("*");
      if (plants.length > 1) {
        return { type: "eat", direction: randomElement(plants) };
      }
      if (space) {
        const dir = context.look(this.direction) === " " ? this.direction : space;
        return { type: "move", direction: dir };
      }
    }
  }
  
  
  let valley = new LifelikeWorld(
    [
      "############################",
      "#####                 ######",
      "##   ***                **##",
      "#   *##**         **  O  *##",
      "#    ***     O    ##**    *#",
      "#       O         ##***    #",
      "#                 ##**     #",
      "#   O       #*             #",
      "#*          #**       O    #",
      "#***        ##**    O    **#",
      "##****     ###***       *###",
      "############################",
    ],
    {
      "#": Wall,
      O: PlantEater,
      "*": Plant,
    }
  );
  
  let valley2 = new LifelikeWorld(
    [
      "############################",
      "#####                 ######",
      "##   ***                **##",
      "#   *##**         **  O  *##",
      "#    ***     O    ##**    *#",
      "#       O         ##***    #",
      "#                 ##**     #",
      "#   O       #*             #",
      "#*          #**       O    #",
      "#***        ##**    O    **#",
      "##****     ###***       *###",
      "############################",
    ],
    {
      "#": Wall,
      O: BetterPlantEater,
      "*": Plant,
    }
  );
  
  class Tiger {
    constructor(energy,direction,preySeen){
    this.energy = 100;
    this.direction = "w";
    this.preySeen = [];
  }
  act(view){
    let seenPerTurn = this.preySeen.reduce(function (a, b) {
      return a + b;
    }, 0) / this.preySeen.length;
    let prey = view.findAll("O");
    this.preySeen.push(prey.length);
    if (this.preySeen.length > 6)
      this.preySeen.shift();
    if (prey.length && seenPerTurn > 0.25)
      return { type: "eat", direction: randomElement(prey) };
    let space = view.find(" ");
    if (this.energy > 400 && space)
      return { type: "reproduce", direction: space };
    if (view.look(this.direction) != " " && space)
      this.direction = space;
    return { type: "move", direction: this.direction };
  }
  }
  
  const world2 = new LifelikeWorld(
    ["####################################################",
      "#                 ####         ****              ###",
      "#   *  @  ##                 ########       OO    ##",
      "#   *    ##        O O                 ****       *#",
      "#       ##*                        ##########     *#",
      "#      ##***  *         ****                     **#",
      "#* **  #  *  ***      #########                  **#",
      "#* **  #      *               #   *              **#",
      "#     ##              #   O   #  ***          ######",
      "#*            @       #       #   *        O  #    #",
      "#*                    #  ######                 ** #",
      "###          ****          ***                  ** #",
      "#       O                        @         O       #",
      "#   *     ##  ##  ##  ##               ###      *  #",
      "#   **         #              *       #####  O     #",
      "##  **  O   O  #  #    ***  ***        ###      ** #",
      "###               #   *****                    ****#",
      "####################################################"],
    {
      "#": Wall,
      "@": Tiger,
      "O": BetterPlantEater, 
      "*": Plant
    }
  )