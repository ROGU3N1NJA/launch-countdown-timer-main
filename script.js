// Create Countdown
var Countdown = {
  // Backbone-like structure
  $el: $(".countdown"),

  // Params
  countdown_interval: null,
  total_seconds: 0,

  // Initialize the countdown
  init: function () {
    // DOM
    this.$ = {
      days: this.$el.find(".card.days .figure"),
      hours: this.$el.find(".card.hours .figure"),
      minutes: this.$el.find(".card.minutes .figure"),
      seconds: this.$el.find(".card.seconds .figure"),
    };

    // Init countdown values
    this.values = {
      days: 8,
      hours: 23,
      minutes: 55,
      seconds: 41,
    };

    // Initialize total seconds
    this.total_seconds = this.values.days * 86400 + this.values.hours * 60 * 60 + this.values.minutes * 60 + this.values.seconds;

    // Animate countdown to the end
    this.count();
  },

  count: function () {
    var that = this,
      $day = this.$.days.eq(0),
      $hour = this.$.hours.eq(0),
      $min = this.$.minutes.eq(0),
      $sec = this.$.seconds.eq(0);

    this.countdown_interval = setInterval(function () {
      if (that.total_seconds > 0) {
        --that.values.seconds;

        if (that.values.minutes >= 0 && that.values.seconds < 0) {
          that.values.seconds = 59;
          --that.values.minutes;
        }

        if (that.values.hours >= 0 && that.values.minutes < 0) {
          that.values.minutes = 59;
          --that.values.hours;
        }

        if (that.values.days >= 0 && that.values.hours < 0) {
          that.values.hours = 24;
          --that.values.days;
        }

        // Update DOM values
        that.checkHour(that.values.days, $day);

        // Hours
        that.checkHour(that.values.hours, $hour);

        // Minutes
        that.checkHour(that.values.minutes, $min);

        // Seconds
        that.checkHour(that.values.seconds, $sec);

        --that.total_seconds;
      } else {
        clearInterval(that.countdown_interval);
      }
    }, 1000);
  },

  animateFigure: function ($el, value) {
    var that = this,
      $top = $el.find(".top"),
      $bottom = $el.find(".bottom"),
      $back_top = $el.find(".top-back"),
      $back_bottom = $el.find(".bottom-back");

    // Before we begin, change the back value
    $back_top.find("span").html(value);

    // Also change the back bottom value
    $back_bottom.find("span").html(value);

    // Then animate
    TweenMax.to($top, 0.8, {
      rotationX: "-180deg",
      transformPerspective: 300,
      ease: Quart.easeOut,
      onComplete: function () {
        $top.html(value);

        $bottom.html(value);

        TweenMax.set($top, { rotationX: 0 });
      },
    });

    TweenMax.to($back_top, 0.8, {
      rotationX: 0,
      transformPerspective: 300,
      ease: Quart.easeOut,
      clearProps: "all",
    });
  },

  checkHour: function (value, $el_1) {
    var val_1 = value.toString(),
      fig_1_value = $el_1.find(".top").html();
    if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
  },
};

// // Let's go !
Countdown.init();
