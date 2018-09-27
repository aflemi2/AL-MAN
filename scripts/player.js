Quintus.ActionPlatformerPlayer = function(Q) {

  Q.Sprite.extend("Player",{
    init: function(p) {
      this._super(p, {
        sheet: "player",
        jumpSpeed: -300,
        speed: 100,
        isJumping: false
      });
      this.add("2d, platformerControls");
      var that = this;

      this.on("hit.sprite",function(collision) {
            if(collision.obj.isA("Coin")) {
                collision.obj.destroy();
                this.p.coins++;
                var coinsLabel = Q("UI.Text",1).items[1];
                coinsLabel.p.label = 'Coins x '+this.p.coins;
            }
        });

      this.on("jump", function(){
        if(!that.p.isJumping && that.p.vy < 0) {
          that.p.isJumping = true;
          Q.audio.play("jump.mp3");
        }
      });

      this.on("bump.bottom", function(){
        that.p.isJumping = false;
      });
    },
    damage: function() {
      Q.stageScene("level");
    }
  });
};
