(function () {
  window.Components = window.Components || {};

  window.Components.fireworks2 = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-fireworks";

      const bursts = section.bursts || 5;
      const sparksPerBurst = section.count ? Math.floor(section.count / bursts) : 12;
      const colors = ["#ff69b4", "#15a1ed", "#f9d423", "#42e695", "#bd6ecf", "#ff6b6b", "#ffd93d"];

      for (let b = 0; b < bursts; b++) {
        const group = document.createElement("div");
        group.className = "firework-group";

        const originX = Math.random() * 70 + 15;
        const originY = Math.random() * 40 + 15;

        const rocket = document.createElement("div");
        rocket.className = "firework-rocket";
        rocket.style.left = originX + "%";
        group.appendChild(rocket);

        const color = colors[b % colors.length];
        for (let i = 0; i < sparksPerBurst; i++) {
          const spark = document.createElement("div");
          spark.className = "firework-spark";
          spark.style.left = originX + "%";
          spark.style.top = originY + "%";
          spark.style.backgroundColor = color;
          spark.style.width = spark.style.height = (Math.random() * 5 + 8) + "px";

          const angle = (Math.PI * 2 * i) / sparksPerBurst + Math.random() * 0.4;
          const distance = Math.random() * 120 + 80;
          spark.dataset.dx = Math.cos(angle) * distance;
          spark.dataset.dy = Math.sin(angle) * distance;

          group.appendChild(spark);
        }

        div.appendChild(group);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const groups = el.querySelectorAll(".firework-group");
      const sub = gsap.timeline();

      groups.forEach((group, i) => {
        const rocket = group.querySelector(".firework-rocket");
        const sparks = group.querySelectorAll(".firework-spark");
        const delay = i * 0.4;

        sub.fromTo(rocket,
          { y: 0, opacity: 1 },
          { y: "-" + (window.innerHeight * 0.5) + "px", duration: 0.6, ease: "power1.out" },
          delay
        )
        .to(rocket, { opacity: 0, duration: 0.1 }, delay + 0.55);

        sub.fromTo(sparks,
          { x: 0, y: 0, scale: 0, opacity: 1 },
          {
            x: (idx, target) => parseFloat(target.dataset.dx),
            y: (idx, target) => parseFloat(target.dataset.dy),
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          delay + 0.6
        )
        .to(sparks, {
          y: "+=60",
          opacity: 0,
          duration: 1,
          ease: "power1.in",
        }, delay + 1.1);
      });

      sub.to(el, { opacity: 0, duration: 0.3 }, "+=0.3");
      tl.add(sub, "<");
    },
  };
})();