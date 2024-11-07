//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
test.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "Mostafa Hussein",
        app: "deadsoil",
        build: "0.0.0",
        scene: test.scene.menu,
        resources: test.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 30,
        debug: true,
        screenResolutionX: 640, // 400
        screenResolutionY: 360, // 225

      
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

test.system.Main.prototype = Object.create(rune.system.Application.prototype);
test.system.Main.prototype.constructor = test.system.Main;