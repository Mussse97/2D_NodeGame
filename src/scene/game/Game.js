        //------------------------------------------------------------------------------
        // Constructor scope
        //------------------------------------------------------------------------------

        /**
         * Creates a new object.
         *
         * @constructor
         * @extends rune.scene.Scene
         *
         * @class
         * @classdesc
         * 
         * Game scene.
         */
        test.scene.Game = function() {
        
        
        
            //--------------------------------------------------------------------------
            // Super call
            //--------------------------------------------------------------------------
            
            /**
             * Calls the constructor method of the super class.
             */
            rune.scene.Scene.call(this);
        };

        //------------------------------------------------------------------------------
        // Inheritance
        //------------------------------------------------------------------------------

        test.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
        test.scene.Game.prototype.constructor = test.scene.Game;

        //------------------------------------------------------------------------------
        // Override public prototype methods (ENGINE)
        //------------------------------------------------------------------------------

        /**
         * This method is automatically executed once after the scene is instantiated. 
         * The method is used to create objects to be used within the scene.
         *
         * @returns {undefined}
         */
        test.scene.Game.prototype.init = function() {
            rune.scene.Scene.prototype.init.call(this);
            this.removedMonsters = 0;
            this.playerHealth = 100;
        
            test.scene.Game.prototype.initHealthBar = function() {

            this.countText = new rune.text.BitmapField();
            this.countText.text = "Kills:" + this.removedMonsters;
            this.playerhealth = new rune.text.BitmapField();
            this.playerhealth.text = "Health:" + this.playerHealth;
            
            this.playerhealth.scaleX = 2;
            this.playerhealth.scaleY = 2;
            this.playerhealth.x = 10;
            this.playerhealth.y = 40;
            
            this.countText.scaleX = 2;
            this.countText.scaleY = 2;
            this.countText.x = 10;
            this.countText.y = 20;
            this.stage.addChild(this.countText);
            this.stage.addChild(this.playerhealth);
            }
        
            this.monsters = new rune.display.DisplayGroup(this.stage);
            this.initGraphic();
            this.initPlayer();
            this.initHealthBar();
            
           
            this.barWidth = 80;
            this.barHeight = 9;
            this.healthbar = new rune.display.Graphic(140, 43, this.barWidth, this.barHeight);
            this.healthbar.backgroundColor = "green";
            this.stage.addChild(this.healthbar);
            this.controller = this.gamepads.get(0)
        
        
            this.swordMiss = this.application.sounds.sound.get("Slash_Miss");
            this.swordMiss.loop = false;
            this.swordMiss.volume = 0.02;
            
            this.swordHit = this.application.sounds.sound.get("Slash_Hit");
            this.swordHit.loop = false;
            this.swordHit.volume = 0.07;
            
        
            this.lowhealth = this.application.sounds.sound.get("LowHealth_01");
            this.lowhealth.loop = true;
            this.lowhealth.volume = 0.08;

            this.playerHit = this.application.sounds.sound.get("PlayerHit_01");
            this.playerHit.loop = false;
            this.playerHit.volume = 0.08;

            this.gameMusic = this.application.sounds.music.get("GameSound2");
            this.gameMusic.play();
            this.gameMusic.volume = 0.009;
            this.gameMusic.loop = false;

    this.switchingLetters = new rune.text.BitmapField(" ");
    this.switchingLetters.scaleX = 2;
    this.switchingLetters.scaleY = 2;
    
    this.switchingLetters.y = 95;
    this.switchingLetters.x = 205;
    this.stage.addChild(this.switchingLetters);

    this.nameField = new rune.text.BitmapField(" ");
    this.nameField.scaleX = 2;
    this.nameField.scaleY = 2;
    
    this.nameField.y = 110;
    this.nameField.x = 255;
    this.stage.addChild(this.nameField);

    
   
    this.enteredName = " ";
    this.letterIndex = 0;
    this.testScore = false;



            

            this.countDown = new rune.text.BitmapField();
            this.countDown.text = "Survive the the waves of monsters";
            this.countDown.scaleX = 2;
            this.countDown.scaleY = 2;
            this.countDown.center = this.application.screen.center;
            this.stage.addChild(this.countDown);
            this.timers.create({
                duration: 1000, scope: this, onComplete: function() {
                    this.countDown.text = "3";
                    this.player.invulnerable = true;
                    this.timers.create({
                        duration: 1000, scope: this, onComplete: function() {
                            this.countDown.text = "2";
                            this.player.invulnerable = true;
                            this.timers.create({
                                duration: 1000, scope: this, onComplete: function() {
                                    this.countDown.text = "1";
                                    this.player.invulnerable = true;
                                    this.timers.create({
                                        duration: 1000, scope: this, onComplete: function() {
                                            this.stage.removeChild(this.countDown);
                                            this.player.invulnerable = false;
                                        }
                                    });
                                    
                                }
                            });
                        }
                    });
                }
            });
            this.enemyMonster();
            this.numEnemy = 1;        
        };

        /**
         * This method is automatically executed once per "tick". The method is used for 
         * calculations such as application logic.
         *
         * @param {number} step Fixed time step.
         *
         * @returns {undefined}
         */
        test.scene.Game.prototype.update = function(step) {
            rune.scene.Scene.prototype.update.call(this, step);
                    
                if(this.playerHealth <= 0){
                    if(this.justWon != true){
                        this.red = new rune.display.Graphic(0,0, 800, 600);
                        this.red.backgroundColor = "red";
                        this.stage.addChild(this.red);
                        this.red.alpha = 0;
                        this.gameMusic.stop();
                        this.lowhealth.stop();
                        this.stage.addChild(this.switchingLetters);
                        this.stage.addChild(this.nameField);
                        this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    

                        
                        
                      
                        this.addName = new rune.text.BitmapField("Enter 3 letter name By using arrow keys");
                        this.addName.autoSize = true;
                        this.addName.y = 70;
                        this.addName.x = 205;
                        this.stage.addChild(this.addName);

                    
                        
            this.scoreTable = new rune.data.Highscores("Deadsoil", 5, 1);
            this.scoreTable.test(this.score);
             

        if (this.scoreTable.test(this.removedMonsters) != -1 && this.enteredName.lenght == 4) {
            this.scoreTable.send(this.removedMonsters, this.enteredName);
            
            var madeList = new rune.text.BitmapField("You made the highscore List!")
            madeList.autoSize = true;
            madeList.center = this.application.screen.center;
            this.stage.addChild(madeList);
            madeList.backgroundColor = "#000000"
            madeList.x = 170;
            madeList.y = 30
            madeList.flicker.start(1000, 50);

        }
                        this.tweens.create({
                                target: this.red,
                                scope: this,
                                duration: 1000,
                                onUpdate: function(red) {
                                    //Opacity för red.
                                    red.alpha += 0.05;
                                },
                            });
                        
                    this.dead = new rune.text.BitmapField();
                    this.dead.text = "YOU DIED " +"With " + this.removedMonsters + " kills " + "Press BACK to go to menuu";
                    this.dead.autoSize = true;
                    this.name = new rune.text.BitmapField();
   
                    this.dead.center = this.application.screen.center;
                    this.stage.addChild(this.dead);
                    this.justWon = true;
                   
                    this.directions = new rune.text.BitmapField();
                    this.directions.text = "Press start to retry";
                    this.directions.backgroundColor = "#000000"
                    this.stage.addChild(this.directions);
                    this.directions.x = 230;
                    this.directions.y = 250;
                    }
                    
                    if (this.keyboard.justPressed("C")) {
                           
                        this.letterIndex = (this.letterIndex + 1) % this.letters.length;
                        this.switchingLetters.text = this.letters[this.letterIndex];
                    } else if (this.keyboard.justPressed("X")) {
                        this.letterIndex = (this.letterIndex - 1 + this.letters.length) % this.letters.length;
                        this.switchingLetters.text = this.letters[this.letterIndex];
                    } else if (this.keyboard.justPressed("Z") && this.enteredName.length < 4) {
                        if (this.nameField.text !== "") {
                            this.nameField.text += " "; 
                        }
                        this.enteredName += this.letters[this.letterIndex];
                    }
                 
                    this.nameField.text = this.enteredName; 
                    this.switchingLetters.text = this.letters[this.letterIndex]
                    console.log(this.letters[this.letterIndex]);
                    
                    if (this.scoreTable.test(this.removedMonsters) != -1 && this.enteredName.length == 4) {
                        if(this.testScore == false){
                            this.testScore = true;
                        this.scoreTable.send(this.removedMonsters, this.enteredName);
                        
                        var madeList = new rune.text.BitmapField("You made the highscore List!")
                        madeList.autoSize = true;
                        madeList.center = this.application.screen.center;
                        this.stage.addChild(madeList);
                        madeList.backgroundColor = "#000000"
                        madeList.x = 170;
                        madeList.y = 30
                        madeList.flicker.start(1000, 50);
                        }
                    }
                
                    if(this.keyboard.justPressed("K") || this.controller.pressed(8)){
                        this.application.scenes.load([new test.scene.menu()]);
                    }
                    if(this.keyboard.justPressed("y") || this.controller.pressed(9)){
                        this.application.scenes.load([new test.scene.Game()]);
                    }
                return;
                }
            
        if(this.numEnemy > this.monsters.numMembers){
            var x = Math.round(Math.random());
            if(x == 0){
                this.enemySmorc();
            }
            else this.enemyMonster();
        }
        // Player rörelser.
            var walking = false
            if(this.keyboard.pressed("d") || this.controller.stickLeft.x > 0.2){
                this.player.x +=3;
                this.sword.flippedX = false;
                this.player.flippedX = false;
                walking = true;
            }
            if(this.keyboard.pressed("a")|| this.controller.stickLeft.x < -0.2){
                this.player.x -=3;
                this.sword.flippedX = true;
                this.player.flippedX = true;
                walking = true;
            }
            if(this.keyboard.pressed("w")|| this.controller.stickLeft.y < -0.2){
                this.player.y -=3;
                walking = true;
            }
            if(this.keyboard.pressed("s")|| this.controller.stickLeft.y > 0.2){
                this.player.y +=3;
                walking = true;
            }
    
            if(this.player.attackCd == false &&(this.keyboard.pressed("f") || this.controller.pressed(2))){
                this.swordMiss.play();
                this.player.animation.gotoAndPlay("attack",0);
                walking = true;

                if(this.sword.flippedX == true){
                    this.sword.hitbox.set(-60,2, 50,5);
                }
                else{
                    this.sword.hitbox.set(6,5, 20, 5);
                    
                }
            this.player.attackCd = true;
            this.player.attack = true;

            this.timers.create({
                // attack animation längd!
                duration: 400, scope: this, onComplete: function(){
                    this.player.attack= false
                    this.timers.create({
                        // coldown för attack
                        duration: 800, scope: this, onComplete: function(){
                            this.player.attackCd = false;
                        }
                    })
                }
            })
            }
            else if(this.player.attack == false){
                this.sword.hitbox.set(0,0 ,5,20);
            }

        if(walking == false && this.player.attack == false){
            this.player.animation.gotoAndPlay("idle");
            
        }
        else if(this.player.attack == false){
            this.player.animation.gotoAndPlay("run");
        }
    

        var t = this;
        // Monster rörelser.
        
       if(this.countDown.text == "1"){
        this.monsters.forEachMember(function(monster) {
            if(t.player.x < monster.x){
                monster.x -=monster.speed;
                monster.flippedX = true;
            }

            if(t.player.x > monster.x){
                monster.x +=monster.speed;
                monster.flippedX = false;
            }

            if(t.player.y < monster.y){
                monster.y -=monster.speed;
            }

            if(t.player.y > monster.y){
                monster.y +=monster.speed;
            }
        });
    }
    this.currentWidth = (this.playerHealth / 100) * this.barWidth;
        this.healthbar.width = this.currentWidth;
    

    this.sword.x = this.player.x + 50  + this.sword.width/2;
    this.sword.y = this.player.y + 40  + this.sword.height/2;
    
    this.container.x = this.player.x   + this.container.width/2;
    this.container.y = this.player.y +45  + this.container.height/2;

        
            this.player.hitTestAndSeparateGroup(this.walls)
            this.monsters.hitTestAndSeparateGroup(this.walls, this.house)
        


            this.sword.hitTestGroup(this.monsters, function(sword,monster) {
            
                t.swordHit.play();
                if(t.player.attack == true ){
                    monster.animation.gotoAndPlay("dead");
                    t.removedMonsters += 1;
                    monster.invulnerable = true;
                    monster.hitbox.set(0,0,0,0);
                    monster.speed = 0;         
                t.countText.text = "Kills:" + t.removedMonsters; 
                  
                t.timers.create({
                        duration: 200, scope: this, onComplete: function() {
                                t.monsters.removeMember(monster);
                        }
                    })      
                };
                
            });
            this.player.hitTestGroup(this.monsters, function(player,monster) {
               
                   if(player.attack == true ){
                  
                    }
                    else{
                        monster.animation.gotoAndPlay("attack");
                        this.timers.create({
                            duration: 2000, scope: this, onComplete: function() {
                                monster.animation.gotoAndPlay("walk");
                            }
                        });
                    };
                        if(player.invulnerable == false){
                            player.invulnerable = true;
                            t.playerHealth -= monster.damage;
                            this.playerHit.play();
                            player.flicker.start(500, 40,  function() {
                                player.invulnerable = false;
                            });
                            t.playerhealth.text = "Health:" + t.playerHealth;
                        };
                    
                    if (player.x < monster.x){
                        monster.flippedX = true;
                    };
                },this);
            
            this.numEnemy += 0.006; 
            if(this.playerHealth < 30){
                this.gameMusic.volume = 0.001;
                this.lowhealth.play();
                
            }
        };

        /**
         * This method is automatically called once just before the scene ends. Use 
         * the method to reset references and remove objects that no longer need to 
         * exist when the scene is destroyed. The process is performed in order to 
         * avoid memory leaks.
         *
         * @returns {undefined}
         */
        test.scene.Game.prototype.dispose = function() {
            rune.scene.Scene.prototype.dispose.call(this);

                this.playerHealth = null;
                this.removedMonsters = null;
                this.player = null;
                this.monsters = null;
                this.sword = null;
                this.timers = null;
                this.barHeight = null;
                this.barWidth = null;
                this.healthbar = null; 
                this.countText = null;

        };

        test.scene.Game.prototype.initPlayer = function(){
        this.player = new rune.display.Sprite(64, 64, 64, 64,  "Main_sprite");
        this.player.animation.create("idle", [0], 1, true );
        this.player.animation.create("run", [2,3], 4, true );
        this.player.animation.create("attack", [4,5,6],6, false );
        this.stage.addChild(this.player);
    
            this.player.invulnerable = false;
            this.player.hitbox.set(17,12 ,35,50);
            this.player.hitbox.debug = true;
            this.player.hitbox.debugColor = "#ff0000";
            this.player.attack= false;
            this.player.attackCd= false;
        
        
        this.sword = new rune.display.Graphic(0, 0, 5, 10);
        this.sword.backgroundColor = "blue";
        this.sword.hitbox.set(0,0,5,20);
        this.sword.hitbox.debug = false;
        this.sword.flippedX = false;
        //make this.sword invisible
        this.sword.visible = false;

        this.container = new rune.display.Graphic(0, 0, 60, 1);
        this.container.backgroundColor = "orange";
        this.container.alpha = 0;
        this.container.hitbox.set(0,0,60,10);
        this.container.hitbox.debugColor = "white";
        this.container.hitbox.debug = false;
        this.stage.addChild(this.container);
        this.stage.addChild(this.sword);
        }
        test.scene.Game.prototype.enemyMonster = function(){
            var x = Math.random()*(this.application.width - 80)
            var y = Math.random()*(this.application.height - 80)

            this.monster = new rune.display.Sprite(x, y, 64, 64,  "Monster2");
            this.monster.animation.create("walk", [0,1], 2, true );
            this.monster.animation.create("attack", [2,3,4], 5, true );
            this.monster.animation.create("dead", [5,6], 8, false );
        
            this.monster.flippedX = true;
            this.monsters.addMember(this.monster);
            this.monster.hitbox.set(14,6, 35,55);

            this.monster.hitbox.debug = true;
            this.monster.hitbox.debugColor = "#ff0000";
            this.monster.velocity.max.x = 0.5;
            this.monster.velocity.max.y = 0.5;
            this.monster.speed = 1.5;
            this.monster.damage = 10;
        }

        test.scene.Game.prototype.enemySmorc = function(){

            var x = Math.round(Math.random())
            x = this.application.width*x - 80*x

            var y = Math.round(Math.random())
            y = this.application.width*y - 80*y

            this.monster = new rune.display.Sprite(x, y, 64, 64,  "Monster1");
            this.monster.animation.create("walk", [0,1], 2, true );
            this.monster.animation.create("attack", [2,3,4], 5, true );
            this.monster.animation.create("dead", [5,6,7], 2, false );
            this.monster.scaleX = 1.3;
            this.monster.scaleY = 1.3;
            this.monster.flippedX = false;
            this.monsters.addMember(this.monster);
            this.monster.hitbox.set(17,14 ,35,40)
            this.monster.hitbox.debug = true;
            this.monster.hitbox.debugColor = "#ff0000";
            this.monster.velocity.max.x = 0.5;
            this.monster.velocity.max.y = 0.5;
            this.monster.speed = 1.4;
            this.monster.damage = 20;
        }

        test.scene.Game.prototype.initGraphic = function(){
            this.graphic = new rune.display.Graphic(0, 0, 1920, 1080, "Background2");
            this.stage.addChild(this.graphic);
            this.graphic.scaleX = 0.35;
            this.graphic.scaleY = 0.35;
            this.walls = new rune.display.DisplayGroup(this.stage);
            var walls = [
                [0,-10,640,10], 
                [0,360,640,10], 
                [-10,0,10,360],
                [640,0,10,360]  
            ]
        
            
        
            for (var i = 0; i < walls.length; i++) {
                var wallsTops = walls[i]
                var wallsSide = new rune.display.Graphic(wallsTops[0],wallsTops[1],wallsTops[2],wallsTops[3])
                wallsSide.immovable = true;
                this.walls.addMember(wallsSide);
            }
        }


        