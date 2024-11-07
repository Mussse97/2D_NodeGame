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
    test.scene.menu = function() {

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

    test.scene.menu.prototype = Object.create(rune.scene.Scene.prototype);
    test.scene.menu.prototype.constructor = test.scene.menu;

    //------------------------------------------------------------------------------
    // Override public prototype methods (ENGINE)
    //------------------------------------------------------------------------------

    /**
     * This method is automatically executed once after the scene is instantiated. 
     * The method is used to create objects to be used within the scene.
     *
     * @returns {undefined}
     */
    test.scene.menu.prototype.init = function() {
        rune.scene.Scene.prototype.init.call(this);
        
        this.background = new rune.display.Graphic(0, 0, 1920, 1080,"Mark");
        this.stage.addChild(this.background);
        this.background.scaleX = 0.4;
        this.background.scaleY = 0.4;
        
        this.text = new rune.text.BitmapField("Space / Start to play");
        this.text.autoSize = true;
        this.text.center = this.application.screen.center;
        this.stage.addChild(this.text);

        this.text2 = new rune.text.BitmapField("B / LT to see controls");
        this.text2.autoSize = true;
        this.text2.center = this.application.screen.center;
        this.text2.y = 200;
        this.stage.addChild(this.text2);
        
        this.controller = this.gamepads.get(0)
        this.menuMusic = this.application.sounds.music.get("DarkStart1");
        this.menuMusic.play();
        this.menuMusic.volume = 0.02;
        //this.menuMusic.volume = 0;
        this.menuMusic.loop = false;
        
        
    this.sword = new rune.display.Sprite(400, 150, 100, 100, "Menu_sword")
    this.sword.animation.create("idle", [0,1,],1), true;
    this.stage.addChild(this.sword);
    this.sword.animation.gotoAndPlay("idle");

   /* this.switchingLetters = new rune.text.BitmapField(" ");
    this.switchingLetters.scaleX = 2;
    this.switchingLetters.scaleY = 2;
    this.switchingLetters.center = this.application.screen.center;
    this.switchingLetters.y = 325;
    this.stage.addChild(this.switchingLetters);

    this.nameField = new rune.text.BitmapField(" ");
    this.nameField.scaleX = 2;
    this.nameField.scaleY = 2;
    this.nameField.center = this.application.screen.center;
    this.nameField.y = 300;
    this.stage.addChild(this.nameField);

    
   
    this.enteredName = " ";
    this.letterIndex = 0;*/
    this.highScoreTable();
  

    


    };

    /**
     * This method is automatically executed once per "tick". The method is used for 
     * calculations such as application logic.
     *
     * @param {number} step Fixed time step.
     *
     * @returns {undefined}
     */
    test.scene.menu.prototype.update = function(step, name) {
        rune.scene.Scene.prototype.update.call(this, step, name);
        
    
    /*var switchingLetters = new rune.text.BitmapField(" ");
    switchingLetters.scaleX = 2;
    switchingLetters.scaleY = 2;
    switchingLetters.center = this.application.screen.center;
    switchingLetters.y = 325;
    this.stage.addChild(switchingLetters);*/

    /*this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    

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
    console.log(this.enteredName.length);*/



        if(this.keyboard.justPressed("SPACE") || this.controller.justPressed(9)){
        this.application.scenes.load([new test.scene.Game()]);
     
        }
            if(this.keyboard.justPressed("b") || this.controller.justPressed(6)){
                this.red = new rune.display.Graphic(0,0, 640, 460, "HowTo");
                this.red.backgroundColor = "red";
                this.stage.addChild(this.red);
                this.red.alpha = 0;
                this.tweens.create({
                        target: this.red,
                        scope: this,
                        duration: 1000,
                        onUpdate: function(red) {
                            //Opacity för red.
                            red.alpha += 0.05;
                        },
                    });
                    
            }else if(this.keyboard.justPressed("k") || this.controller.justPressed(8)){
                this.tweens.create({
                        target: this.red,
                        scope: this,
                        duration: 1000,
                        onUpdate: function(red) {
                            //Opacity för red.
                            red.alpha -= 0.05;
                        },
                    });
            }
        }
    


    /**
     * This method is automatically called once just before the scene ends. Use 
     * the method to reset references and remove objects that no longer need to 
     * exist when the scene is destroyed. The process is performed in order to 
     * avoid memory leaks.
     *
     * @returns {undefined}
     */
    test.scene.menu.prototype.dispose = function() {
        rune.scene.Scene.prototype.dispose.call(this);

    };


        test.scene.menu.prototype.highScoreTable = function() {

            this.scoreTable = new rune.data.Highscores("Deadsoil", 5, 1);
            console.log(this.scoreTable.get(entry));

            for (var i = 0; i < 5; i++) {
             

                var highscoreText = new rune.text.BitmapField("")
                highscoreText.autoSize = true;
                highscoreText.centerY = 110 + 18*i;
                highscoreText.scaleX = 1;
                highscoreText.scaleY = 1;
                highscoreText.x = 30;
                this.stage.addChild(highscoreText);

                var entry = this.scoreTable.get(i);
                var unixTimestamp = entry.date;
                var date = new Date(unixTimestamp);
                var day = String(date.getDate()).padStart(2, '0');
                var month = String(date.getMonth() + 1).padStart(2, '0');
                var year = String(date.getFullYear());
                var formattedDate = `${day}-${month}-${year}`;
                console.log(entry);
            
                highscoreText.text += i+1 + ". " + Math.floor(entry.score) + " Kills " + formattedDate + "  "+entry.name;
            }
        };