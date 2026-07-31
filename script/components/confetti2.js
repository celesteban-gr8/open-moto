(function () {
  window.Components = window.Components || {};

  var retina = window.devicePixelRatio,
      PI = Math.PI, sqrt = Math.sqrt, round = Math.round, random = Math.random,
      cos = Math.cos, sin = Math.sin;

  function Vector2(_x, _y) {
    this.x = _x; this.y = _y;
    this.SqrLength = function () { return this.x * this.x + this.y * this.y; };
    this.Normalize = function () {
      var l = this.SqrLength();
      if (l != 0) { var f = 1.0 / sqrt(l); this.x *= f; this.y *= f; }
    };
    this.Sub = function (v) { this.x -= v.x; this.y -= v.y; };
  }
  Vector2.Sub = function (a, b) { return new Vector2(a.x - b.x, a.y - b.y); };

  var colors = [
    ["#df0049", "#660671"], ["#00e857", "#005291"],
    ["#2bebbc", "#05798a"], ["#ffd200", "#b06c00"]
  ];
  var DEG_TO_RAD = PI / 180;

  function ConfettiPaper(_x, _y) {
    this.pos = new Vector2(_x, _y);
    this.rotationSpeed = (random() * 600 + 800);
    this.angle = DEG_TO_RAD * random() * 360;
    this.rotation = DEG_TO_RAD * random() * 360;
    this.cosA = 1.0;
    this.size = 5.0;
    this.oscillationSpeed = (random() * 1.5 + 0.5);
    this.xSpeed = 40.0;
    this.ySpeed = (random() * 60 + 50.0);
    this.corners = [];
    this.time = random();
    var ci = round(random() * (colors.length - 1));
    this.frontColor = colors[ci][0];
    this.backColor = colors[ci][1];
    for (var i = 0; i < 4; i++) {
      var dx = cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
      var dy = sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
      this.corners[i] = new Vector2(dx, dy);
    }
    this.Update = function (dt) {
      this.time += dt;
      this.rotation += this.rotationSpeed * dt;
      this.cosA = cos(DEG_TO_RAD * this.rotation);
      this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * dt;
      this.pos.y += this.ySpeed * dt;
      if (this.pos.y > ConfettiPaper.bounds.y) {
        this.pos.x = random() * ConfettiPaper.bounds.x;
        this.pos.y = 0;
      }
    };
    this.Draw = function (g) {
      g.fillStyle = this.cosA > 0 ? this.frontColor : this.backColor;
      g.beginPath();
      g.moveTo((this.pos.x + this.corners[0].x * this.size) * retina, (this.pos.y + this.corners[0].y * this.size * this.cosA) * retina);
      for (var i = 1; i < 4; i++) {
        g.lineTo((this.pos.x + this.corners[i].x * this.size) * retina, (this.pos.y + this.corners[i].y * this.size * this.cosA) * retina);
      }
      g.closePath();
      g.fill();
    };
  }
  ConfettiPaper.bounds = new Vector2(0, 0);

  function ConfettiRibbon(_x, _y, _count, _dist, _thickness, _angle, _mass, _drag) {
    this.particleDist = _dist;
    this.particleCount = _count;
    this.particles = [];
    var ci = round(random() * (colors.length - 1));
    this.frontColor = colors[ci][0];
    this.backColor = colors[ci][1];
    this.xOff = cos(DEG_TO_RAD * _angle) * _thickness;
    this.yOff = sin(DEG_TO_RAD * _angle) * _thickness;
    this.position = new Vector2(_x, _y);
    this.prevPosition = new Vector2(_x, _y);
    this.velocityInherit = (random() * 2 + 4);
    this.time = random() * 100;
    this.oscillationSpeed = (random() * 2 + 2);
    this.oscillationDistance = (random() * 40 + 40);
    this.ySpeed = (random() * 40 + 80);

    function EulerMass(x, y, mass, drag) {
      this.position = new Vector2(x, y);
      this.mass = mass; this.drag = drag;
      this.force = new Vector2(0, 0);
      this.velocity = new Vector2(0, 0);
      this.AddForce = function (f) { this.force.x += f.x; this.force.y += f.y; };
      this.Integrate = function (dt) {
        var speed = sqrt(this.velocity.SqrLength());
        var dragX = this.velocity.x * this.drag * this.mass * speed;
        var dragY = this.velocity.y * this.drag * this.mass * speed;
        var accX = (this.force.x - dragX) / this.mass;
        var accY = (this.force.y - dragY) / this.mass;
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
        this.velocity.x += accX * dt;
        this.velocity.y += accY * dt;
        this.force = new Vector2(0, 0);
      };
    }

    for (var i = 0; i < this.particleCount; i++) {
      this.particles[i] = new EulerMass(_x, _y - i * this.particleDist, _mass, _drag);
    }

    this.Update = function (dt) {
      this.time += dt * this.oscillationSpeed;
      this.position.y += this.ySpeed * dt;
      this.position.x += cos(this.time) * this.oscillationDistance * dt;
      this.particles[0].position = this.position;
      var dX = this.prevPosition.x - this.position.x;
      var dY = this.prevPosition.y - this.position.y;
      var delta = sqrt(dX * dX + dY * dY);
      this.prevPosition = new Vector2(this.position.x, this.position.y);

      for (var i = 1; i < this.particleCount; i++) {
        var dirP = Vector2.Sub(this.particles[i - 1].position, this.particles[i].position);
        dirP.Normalize();
        dirP.x *= (delta / dt) * this.velocityInherit;
        dirP.y *= (delta / dt) * this.velocityInherit;
        this.particles[i].AddForce(dirP);
      }
      for (var i = 1; i < this.particleCount; i++) this.particles[i].Integrate(dt);
      for (var i = 1; i < this.particleCount; i++) {
        var rp2 = Vector2.Sub(this.particles[i].position, this.particles[i - 1].position);
        rp2.Normalize();
        rp2.x = rp2.x * this.particleDist + this.particles[i - 1].position.x;
        rp2.y = rp2.y * this.particleDist + this.particles[i - 1].position.y;
        this.particles[i].position = rp2;
      }
      if (this.position.y > ConfettiRibbon.bounds.y + this.particleDist * this.particleCount) this.Reset();
    };
    this.Reset = function () {
      this.position.y = -random() * ConfettiRibbon.bounds.y;
      this.position.x = random() * ConfettiRibbon.bounds.x;
      this.prevPosition = new Vector2(this.position.x, this.position.y);
    };
    this.Draw = function (g) {
      for (var i = 0; i < this.particleCount - 1; i++) {
        var p0 = this.particles[i].position, p1 = this.particles[i + 1].position;
        g.fillStyle = this.frontColor;
        g.strokeStyle = this.frontColor;
        g.beginPath();
        g.moveTo(p0.x * retina, p0.y * retina);
        g.lineTo(p1.x * retina, p1.y * retina);
        g.lineTo((p1.x + this.xOff) * retina, (p1.y + this.yOff) * retina);
        g.closePath();
        g.stroke(); g.fill();
      }
    };
  }
  ConfettiRibbon.bounds = new Vector2(0, 0);

  window.Components.confetti2 = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-confetti";
      const canvas = document.createElement("canvas");
      canvas.className = "confetti2-canvas";
      div.appendChild(canvas);
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
  const canvas = el.querySelector(".confetti2-canvas");
  const parent = canvas.parentNode;

  tl.call(() => {
    const w = parent.offsetWidth, h = parent.offsetHeight;
    canvas.width = w * retina;
    canvas.height = h * retina;
    const ctx = canvas.getContext("2d");

    ConfettiPaper.bounds = new Vector2(w, h);
    ConfettiRibbon.bounds = new Vector2(w, h);

    const papers = [];
    for (let i = 0; i < 25; i++) papers.push(new ConfettiPaper(random() * w, random() * h));
    const ribbons = [];
    for (let i = 0; i < 8; i++) ribbons.push(new ConfettiRibbon(random() * w, -random() * h * 2, 15, 8, 8, 45, 1, 0.05));

    let rafId;
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      papers.forEach(p => { p.Update(0.02); p.Draw(ctx); });
      ribbons.forEach(r => { r.Update(0.02); r.Draw(ctx); });
      rafId = requestAnimationFrame(loop);
    }
    loop();
    el._confettiStop = () => cancelAnimationFrame(rafId);

    el.style.display = "block";
  }, null, "<");
},

    exit(tl, el) {
      tl.to(el, { opacity: 0, duration: 0.5, onComplete: () => { if (el._confettiStop) el._confettiStop(); } });
    },
  };
})();