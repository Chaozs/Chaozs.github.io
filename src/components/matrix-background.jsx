import React from "react";

class MatrixBackground extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.animationFrameId = null;
    this.ctx = null;
    this.drops = [];
    this.columns = 0;
    this.fontSize = 22;
    this.dpr = 1;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.columnSpacing = 0.65;
    this.speed = 0.6;
    this.lastWidth = 0;
    this.lastHeight = 0;
  }

  componentDidMount() {
    this.initMatrix();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  handleResize = () => {
    this.initMatrix(true);
  };

  initMatrix = (restart = false) => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const heightDelta = Math.abs(height - this.lastHeight);

    if (restart && this.lastWidth === width && heightDelta > 0 && heightDelta < 120) {
      return;
    }

    this.dpr = window.devicePixelRatio || 1;
    canvas.width = width * this.dpr;
    canvas.height = height * this.dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.ctx = ctx;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.lastWidth = width;
    this.lastHeight = height;

    this.columns = Math.floor(width / (this.fontSize * this.columnSpacing));
    this.drops = new Array(this.columns).fill(1);

    if (restart && this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animateMatrix();
  };

  animateMatrix = () => {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.fillStyle = "rgba(11, 26, 18, 0.06)";
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    ctx.fillStyle = "#3bd16f";
    ctx.font = `${this.fontSize}px monospace`;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    ctx.save();
    ctx.setTransform(-this.dpr, 0, 0, this.dpr, this.canvasWidth * this.dpr, 0);
    for (let i = 0; i < this.drops.length; i += 1) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * this.fontSize * this.columnSpacing;
      const y = this.drops[i] * this.fontSize;
      ctx.fillText(text, x, y);
      const trailText = chars.charAt(Math.floor(Math.random() * chars.length));
      const trailText2 = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(trailText, x, y - this.fontSize * 2);
      ctx.fillText(trailText2, x, y - this.fontSize * 4);

      if (y > this.canvasHeight && Math.random() > 0.99) {
        this.drops[i] = 0;
      }
      this.drops[i] += this.speed;
    }
    ctx.restore();

    this.animationFrameId = requestAnimationFrame(this.animateMatrix);
  };

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          backgroundColor: "#0b1a12",
        }}
      />
    );
  }
}

export default MatrixBackground;
